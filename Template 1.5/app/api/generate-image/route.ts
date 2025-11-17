export async function GET() {
  try {
    const apiKey = process.env.NANO_BANANA_API_KEY

    if (!apiKey) {
      return Response.json({ error: "NANO_BANANA_API_KEY not configured" }, { status: 500 })
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent",
      {
        method: "POST",
        headers: {
          "x-goog-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Professional HVAC equipment including white circular thermostat, digital calipers, measuring tools, and precision instruments on a clean white surface, product photography style, high quality, detailed, photorealistic",
                },
              ],
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Gemini API error:", response.status, errorText)
      return Response.json(
        { error: `API request failed: ${response.status}`, details: errorText },
        { status: response.status },
      )
    }

    const data = await response.json()

    const parts = data?.candidates?.[0]?.content?.parts

    if (!parts || parts.length === 0) {
      console.error("[v0] No parts in response:", JSON.stringify(data).substring(0, 300))
      return Response.json({ error: "No content parts in response" }, { status: 500 })
    }

    // Look for inline_data with image
    const imagePart = parts.find((part: any) => part.inline_data || part.inlineData)

    if (!imagePart) {
      console.error("[v0] No image data found. Response parts:", JSON.stringify(parts).substring(0, 300))
      return Response.json({ error: "No image data in response" }, { status: 500 })
    }

    const imageData = imagePart.inline_data?.data || imagePart.inlineData?.data
    const mimeType = imagePart.inline_data?.mime_type || imagePart.inlineData?.mimeType || "image/png"

    // Return the base64 image data
    return Response.json({ image: `data:${mimeType};base64,${imageData}` })
  } catch (error) {
    console.error("[v0] Error generating image:", error)
    return Response.json({ error: "Failed to generate image" }, { status: 500 })
  }
}
