import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { prompt, width = 400, height = 280, style = "scientific" } = body

    // Construct nano banana themed prompt
    const basePrompt = "nano banana"
    const styleModifiers = {
      scientific: "under microscope, scientific visualization, detailed cellular structure",
      laboratory: "in laboratory setting, research equipment, professional analysis",
      artistic: "artistic interpretation, vibrant colors, creative composition",
      technical: "technical diagram, cross-section view, annotated details",
    }

    const fullPrompt = `${basePrompt} ${prompt || ""} ${styleModifiers[style as keyof typeof styleModifiers] || styleModifiers.scientific}`
    const imageUrl = `/placeholder.svg?height=${height}&width=${width}&query=${encodeURIComponent(fullPrompt)}`

    return NextResponse.json({
      success: true,
      imageUrl,
      prompt: fullPrompt,
      parameters: { width, height, style },
      metadata: {
        apiVersion: "1.0",
        source: "nano-banana-api",
        timestamp: new Date().toISOString(),
        endpoint: "generate",
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate nano banana image",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Nano Banana API - Generate Endpoint",
    description: "POST to this endpoint with custom parameters to generate nano banana images",
    parameters: {
      prompt: "Additional description for the image (optional)",
      width: "Image width in pixels (default: 400)",
      height: "Image height in pixels (default: 280)",
      style: "Image style: scientific, laboratory, artistic, technical (default: scientific)",
    },
    example: {
      prompt: "with glowing particles",
      width: 400,
      height: 280,
      style: "scientific",
    },
  })
}
