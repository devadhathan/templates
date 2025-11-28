import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    const response = await fetch("https://api.nanobananaapi.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.nano}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        image_format: "png",
        image_size: "16:9",
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()

    // Extract image from response
    const imageData = data.choices?.[0]?.message?.content?.[0]?.inline_data?.data

    if (imageData) {
      // Return base64 image as data URL
      const imageUrl = `data:image/png;base64,${imageData}`
      return NextResponse.json({ imageUrl })
    }

    throw new Error("No image data in response")
  } catch (error) {
    console.error("[v0] Image generation error:", error)
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 })
  }
}
