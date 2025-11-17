import { NextResponse } from "next/server"
import * as fal from "@fal-ai/serverless-client"

export async function POST(request: Request) {
  try {
    const { context } = await request.json()

    // Check for FAL API key (fal.ai provides Veo 3 access)
    const falKey = process.env.FAL_KEY
    if (!falKey) {
      return NextResponse.json(
        {
          error:
            "FAL_KEY environment variable is not set. Please add the fal integration in the Connect section to use Veo3 video generation.",
        },
        { status: 500 },
      )
    }

    // Configure fal client
    fal.config({
      credentials: falKey,
    })

    // Generate video prompt based on context
    const videoPrompt = `Professional HVAC technician demonstrating quality assurance testing on HVAC equipment. Close-up shots of hands holding white circular HVAC components, using precision measuring tools like calipers. Clean, professional training video style with good lighting. Focus on technical details and professional techniques. High quality, 16:9 aspect ratio.`

    console.log("[v0] Starting Veo3 video generation with prompt:", videoPrompt)

    // Call fal.ai Veo3 model for video generation
    const result = await fal.subscribe("fal-ai/veo3", {
      input: {
        prompt: videoPrompt,
        audio_enabled: false,
      },
      logs: true,
      onQueueUpdate: (update) => {
        console.log("[v0] Queue update:", update.status)
      },
    })

    console.log("[v0] Video generation complete:", result)

    // Return the generated video URL
    return NextResponse.json({
      videoUrl: result.data.video?.url || null,
      message: "Video generated successfully",
    })
  } catch (error) {
    console.error("[v0] Error generating video:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "An unexpected error occurred while generating the video.",
      },
      { status: 500 },
    )
  }
}
