import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, width, height } = body

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const response = await fetch("https://api.nanobanana.com/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // API key is now secure on the server side
        Authorization: `Bearer ${process.env.NANO_BANANA_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        width: width || 512,
        height: height || 512,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to generate image from Nano Banana")
    }

    const data = await response.json()

    return NextResponse.json({
      url: data.url || data.image_url || data.imageUrl,
      success: true,
    })
  } catch (error) {
    console.error("Nano Banana API error:", error)

    return NextResponse.json(
      {
        error: "Failed to generate image",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
