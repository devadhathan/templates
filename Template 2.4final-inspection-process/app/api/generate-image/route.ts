import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    console.log("[v0] Generating placeholder image for prompt:", prompt)
    
    return NextResponse.json({
      imageUrl: `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(prompt)}`,
    })

  } catch (error) {
    console.error("[v0] Error generating image:", error)

    // Fallback to placeholder on error
    try {
      const body = await request.json()
      return NextResponse.json({
        imageUrl: `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(body.prompt)}`,
      })
    } catch {
      return NextResponse.json({
        imageUrl: `/placeholder.svg?height=400&width=600`,
      })
    }
  }
}
