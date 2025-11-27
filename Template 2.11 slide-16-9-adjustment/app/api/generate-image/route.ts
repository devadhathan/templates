import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    console.log("[v0] Generating image with prompt:", prompt)
    console.log("[v0] API Key exists:", !!process.env.NANO_BANANA_API_KEY)

    const apiUrl = "https://api.nanobanana.io/v1/generate"

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NANO_BANANA_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        model: "gemini-2.5-flash-image",
      }),
    })

    console.log("[v0] Response status:", response.status)
    console.log("[v0] Response headers:", Object.fromEntries(response.headers.entries()))

    const contentType = response.headers.get("content-type")
    console.log("[v0] Content-Type:", contentType)

    // Check if response is HTML (error page)
    if (contentType?.includes("text/html")) {
      const htmlText = await response.text()
      console.log("[v0] Received HTML response (first 500 chars):", htmlText.substring(0, 500))
      throw new Error(
        "API endpoint returned HTML instead of JSON. Please check the API endpoint URL and authentication.",
      )
    }

    const responseText = await response.text()
    console.log("[v0] Response text (first 500 chars):", responseText.substring(0, 500))

    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${responseText}`)
    }

    const data = JSON.parse(responseText)
    console.log("[v0] Parsed data structure:", Object.keys(data))

    // Try to extract image URL from various possible response formats
    let imageUrl = null

    if (data.imageUrl) {
      imageUrl = data.imageUrl
    } else if (data.image_url) {
      imageUrl = data.image_url
    } else if (data.url) {
      imageUrl = data.url
    } else if (data.data?.url) {
      imageUrl = data.data.url
    } else if (data.output) {
      imageUrl = data.output
    }

    console.log("[v0] Extracted image URL:", imageUrl)

    if (!imageUrl) {
      console.log("[v0] Full response data:", JSON.stringify(data, null, 2))
      throw new Error("No image URL found in API response. Response structure may have changed.")
    }

    return NextResponse.json({
      imageUrl,
    })
  } catch (error) {
    console.error("[v0] Image generation error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate image" },
      { status: 500 },
    )
  }
}
