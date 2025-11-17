import { type NextRequest, NextResponse } from "next/server"

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function POST(request: NextRequest) {
  try {
    const { prompts } = await request.json()

    const nanoApiKey = process.env.nano

    if (!nanoApiKey) {
      console.error("[v0] Missing nano API key")
      return NextResponse.json(
        {
          error: "API credentials not configured. Please add the 'nano' environment variable.",
        },
        { status: 500 },
      )
    }

    console.log("[v0] Generating images with Google Gemini API...")
    console.log("[v0] Number of prompts:", prompts.length)

    const images: string[] = []

    for (let index = 0; index < prompts.length; index++) {
      const prompt = prompts[index]

      try {
        console.log(`[v0] Generating image ${index + 1} for prompt:`, prompt)

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${nanoApiKey}`

        const response = await fetch(apiUrl, {
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
              temperature: 0.7,
              maxOutputTokens: 4000,
              responseModalities: ["Text", "Image"],
            },
          }),
        })

        console.log(`[v0] Response status for image ${index + 1}:`, response.status)

        if (!response.ok) {
          const errorText = await response.text()
          console.error(`[v0] Failed to generate image ${index + 1}:`, errorText)
          images.push(`/placeholder.svg?height=300&width=300&query=${encodeURIComponent(prompt)}`)
        } else {
          const data = await response.json()
          console.log(`[v0] Response structure for image ${index + 1}:`, JSON.stringify(data).substring(0, 300))

          // Check if response contains image data
          let imageUrl = null
          if (data.candidates?.[0]?.content?.parts) {
            for (const part of data.candidates[0].content.parts) {
              // Check for inline data (base64 image)
              if (part.inlineData) {
                const mimeType = part.inlineData.mimeType || "image/png"
                const imageData = part.inlineData.data
                imageUrl = `data:${mimeType};base64,${imageData}`
                break
              }
              // Check for text that might contain image URL
              if (part.text && (part.text.startsWith("http") || part.text.startsWith("data:image"))) {
                imageUrl = part.text
                break
              }
            }
          }

          if (imageUrl) {
            images.push(imageUrl)
          } else {
            console.log(`[v0] No image data found, using placeholder for image ${index + 1}`)
            images.push(`/placeholder.svg?height=300&width=300&query=${encodeURIComponent(prompt)}`)
          }
        }

        if (index < prompts.length - 1) {
          console.log(`[v0] Waiting 6 seconds before next request...`)
          await delay(6000)
        }
      } catch (error) {
        console.error(`[v0] Error generating image ${index + 1}:`, error)
        images.push(`/placeholder.svg?height=300&width=300&query=${encodeURIComponent(prompt)}`)
      }
    }

    console.log("[v0] All images processed")

    return NextResponse.json({ images })
  } catch (error) {
    console.error("[v0] Error in generate-images route:", error)
    return NextResponse.json({ error: "Failed to generate images" }, { status: 500 })
  }
}
