import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "GEMINI_API_KEY environment variable is not set" }, { status: 500 })
    }

    // Call Gemini 2.5 Flash Image API (Nano Banana)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 1,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        }),
      },
    )

    if (!response.ok) {
      const error = await response.text()
      console.error("[v0] Gemini API error:", error)
      return NextResponse.json({ error: "Failed to generate image" }, { status: response.status })
    }

    const data = await response.json()

    // Extract the image data from the response
    const imagePart = data.candidates?.[0]?.content?.parts?.find((part: any) => part.inlineData)

    if (!imagePart?.inlineData?.data) {
      return NextResponse.json({ error: "No image data in response" }, { status: 500 })
    }

    // Return the base64 image data
    return NextResponse.json({
      imageData: imagePart.inlineData.data,
      mimeType: imagePart.inlineData.mimeType || "image/png",
    })
  } catch (error) {
    console.error("[v0] Error generating image:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
