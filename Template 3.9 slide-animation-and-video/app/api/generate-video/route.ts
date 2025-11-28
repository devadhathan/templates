import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const veo3ApiKey = process.env.VEO3_API_KEY

    if (!veo3ApiKey) {
      return NextResponse.json(
        { error: "VEO3_API_KEY not configured. Please add it to your environment variables." },
        { status: 500 },
      )
    }

    // Note: Adjust endpoint and parameters based on actual Veo3 API documentation
    const response = await fetch("https://api.veo3.ai/v1/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${veo3ApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        duration: 6, // seconds
        resolution: "1920x1080",
        aspectRatio: "16:9",
        format: "mp4",
        fps: 30,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("[v0] Veo3 API error:", errorData)
      throw new Error(errorData.message || "Veo3 API request failed")
    }

    const data = await response.json()

    // Adjust based on actual API response structure
    let videoUrl = data.videoUrl || data.url || data.result?.url

    // If API returns a job ID, poll for completion
    if (data.jobId && !videoUrl) {
      videoUrl = await pollForVideo(data.jobId, veo3ApiKey)
    }

    return NextResponse.json({
      videoUrl,
      status: "success",
    })
  } catch (error) {
    console.error("[v0] Video generation error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    )
  }
}

async function pollForVideo(jobId: string, apiKey: string, maxAttempts = 30): Promise<string> {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait 2 seconds between polls

    const response = await fetch(`https://api.veo3.ai/v1/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      if (data.status === "completed" && data.videoUrl) {
        return data.videoUrl
      }
      if (data.status === "failed") {
        throw new Error("Video generation failed")
      }
    }
  }

  throw new Error("Video generation timeout")
}
