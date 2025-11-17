import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

    if (!GOOGLE_API_KEY) {
      console.log("[v0] No GOOGLE_API_KEY found")
      return NextResponse.json({
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        note: "GOOGLE_API_KEY not configured. Using sample video.",
      })
    }

    console.log("[v0] Video generation requested with prompt:", prompt)

    // First, generate a placeholder image URL for the first frame requirement
    const firstFrameUrl = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&h=1080&fit=crop&q=80"

    try {
      // Step 1: Create video generation task
      const generateResponse = await fetch("https://api.aimlapi.com/v2/generate/video/runway/generation", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GOOGLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gen3a_turbo",
          prompt: prompt,
          ratio: "16:9",
          duration: 5,
          image_url: firstFrameUrl,
        }),
      })

      if (!generateResponse.ok) {
        console.log("[v0] Video generation API returned:", generateResponse.status)
        throw new Error(`API returned ${generateResponse.status}`)
      }

      const generateData = await generateResponse.json()
      console.log("[v0] Video generation task created:", generateData)

      const generationId = generateData.id

      if (!generationId) {
        throw new Error("No generation ID returned")
      }

      // Step 2: Poll for the video result
      let attempts = 0
      const maxAttempts = 30 // 30 attempts * 2 seconds = 1 minute max

      while (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const resultResponse = await fetch(
          `https://api.aimlapi.com/v2/generate/video/runway/generation?generation_id=${generationId}`,
          {
            headers: {
              Authorization: `Bearer ${GOOGLE_API_KEY}`,
            },
          },
        )

        if (resultResponse.ok) {
          const resultData = await resultResponse.json()
          console.log("[v0] Video generation status:", resultData.status)

          if (resultData.status === "completed" && resultData.video_url) {
            return NextResponse.json({
              videoUrl: resultData.video_url,
              note: "Video generated successfully using Runway Gen-3 Turbo",
            })
          } else if (resultData.status === "failed") {
            throw new Error("Video generation failed")
          }
        }

        attempts++
      }

      throw new Error("Video generation timeout")
    } catch (apiError) {
      console.error("[v0] API error:", apiError)
      return NextResponse.json({
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        note: "Using sample video - API key may need to be configured for AI/ML API service",
      })
    }
  } catch (error) {
    console.error("[v0] Veo3 API error:", error)
    return NextResponse.json({
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      note: "Error occurred. Using sample video.",
    })
  }
}
