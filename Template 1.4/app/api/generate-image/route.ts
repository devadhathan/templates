import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    const genAI = new GoogleGenerativeAI(process.env.NANO_BANANA_API_KEY || "")
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image-preview" })

    console.log("[v0] Generating image with prompt:", prompt)

    const result = await model.generateContent(prompt)
    const response = await result.response

    // Extract image data from response
    const imagePart = response.candidates?.[0]?.content?.parts?.find((part: any) => part.inlineData)

    if (imagePart?.inlineData?.data) {
      // Convert base64 image data to data URL
      const mimeType = imagePart.inlineData.mimeType || "image/png"
      const imageUrl = `data:${mimeType};base64,${imagePart.inlineData.data}`

      console.log("[v0] Image generated successfully")
      return NextResponse.json({ imageUrl })
    }

    console.log("[v0] No image data in response, using placeholder")
    return NextResponse.json({
      imageUrl: `/placeholder.svg?height=512&width=512&query=${encodeURIComponent(prompt)}`,
    })
  } catch (error) {
    console.error("[v0] Image generation error:", error)
    const body = await request.json().catch(() => ({ prompt: "" }))
    return NextResponse.json({
      imageUrl: `/placeholder.svg?height=512&width=512&query=${encodeURIComponent(body.prompt || "")}`,
    })
  }
}
