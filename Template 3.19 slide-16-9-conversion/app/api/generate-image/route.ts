import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    // Check if Google Gemini API key is available
    const apiKey = process.env.GOOGLE_AI_API_KEY

    if (!apiKey) {
      console.log("[v0] Google AI API key not found, using placeholder")
      return NextResponse.json({
        imageUrl: `/placeholder.svg?height=1080&width=1920&query=${encodeURIComponent(prompt)}`,
      })
    }

    // Make request to Gemini 2.5 Flash Image (Nano Banana) API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${apiKey}`,
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
      throw new Error(`API request failed: ${response.statusText}`)
    }

    const data = await response.json()

    // Extract image data from response
    const imagePart = data.candidates[0]?.content?.parts?.find((part: any) => part.inlineData)

    if (imagePart?.inlineData?.data) {
      // Convert base64 to data URL
      const imageUrl = `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`
      return NextResponse.json({ imageUrl })
    }

    // Fallback to placeholder if no image generated
    return NextResponse.json({
      imageUrl: `/placeholder.svg?height=1080&width=1920&query=${encodeURIComponent(prompt)}`,
    })
  } catch (error) {
    console.error("[v0] Error generating image:", error)
    return NextResponse.json(
      {
        error: "Failed to generate image",
        imageUrl: "/vast-mountain-valley.png",
      },
      { status: 500 },
    )
  }
}
