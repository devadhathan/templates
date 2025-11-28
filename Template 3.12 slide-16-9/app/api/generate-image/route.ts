import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    const response = await fetch("https://wisdom-gate.juheapi.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.NANO_BANANA_API_KEY || "",
        Accept: "*/*",
      },
      body: JSON.stringify({
        model: "wisdom-vision-gemini-2.5-flash-image",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] API response error:", response.status, errorText)
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()

    const imageBase64 = data?.choices?.[0]?.message?.content

    if (!imageBase64) {
      throw new Error("No image data in response")
    }

    // Return the base64 image as a data URL
    const imageUrl = `data:image/png;base64,${imageBase64}`

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error("[v0] Image generation error:", error)
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 })
  }
}
