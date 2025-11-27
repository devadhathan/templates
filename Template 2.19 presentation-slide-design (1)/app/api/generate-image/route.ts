import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    // Nano Banana API integration
    // Documentation: Replace the endpoint below with actual nano banana API endpoint
    const response = await fetch("https://api.nanobanana.ai/v1/images/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NANO_BANANA_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        width: 1280,
        height: 720,
        // Add other nano banana specific parameters here
      }),
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    // Adjust based on nano banana's actual response structure
    return NextResponse.json({
      imageUrl: data.url || data.image_url || data.output,
    })
  } catch (error) {
    console.error("[v0] Nano Banana API Error:", error)
    return NextResponse.json(
      {
        error: "Image generation failed",
        imageUrl: "/beautiful-landscape-with-green-hills-and-blue-sky.jpg",
      },
      { status: 500 },
    )
  }
}
