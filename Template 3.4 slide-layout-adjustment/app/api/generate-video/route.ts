import { type NextRequest, NextResponse } from "next/server"

const generationTasks = new Map<string, { status: string; videoUrl?: string; error?: string }>()

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    console.log("[v0] Generating video with prompt:", prompt)

    const response = await fetch("https://api.veo3gen.co/api/veo/text-to-video", {
      method: "POST",
      headers: {
        "X-API-Key": process.env.VEO3_API_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        model: "veo-3.0-fast-generate-preview",
      }),
    })

    console.log("[v0] Veo3 API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Veo3 API error:", errorText)
      throw new Error(`Veo3 API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log("[v0] Veo3 API response data:", data)

    const generationId = data.id || data.generationId || data.task_id || crypto.randomUUID()

    // Store task status
    generationTasks.set(generationId, {
      status: data.status || "processing",
      videoUrl: data.video_url || data.url || data.videoUrl,
    })

    return NextResponse.json({
      generationId,
      status: data.status || "processing",
    })
  } catch (error) {
    console.error("[v0] Error in video generation:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate video" },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const generationId = searchParams.get("id")

    if (!generationId) {
      return NextResponse.json({ error: "Missing generation ID" }, { status: 400 })
    }

    // Check stored task status
    const task = generationTasks.get(generationId)

    if (task) {
      return NextResponse.json(task)
    }

    // If not in memory, return pending
    return NextResponse.json({ status: "processing" })
  } catch (error) {
    console.error("[v0] Error checking video status:", error)
    return NextResponse.json({ error: "Failed to check video status" }, { status: 500 })
  }
}
