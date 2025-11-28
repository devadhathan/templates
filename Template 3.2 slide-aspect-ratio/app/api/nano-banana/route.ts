import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Replace with your actual nano banana API endpoint and key
    const NANO_BANANA_API_URL = process.env.NANO_BANANA_API_URL || "https://api.nanobanana.io/v1/images"
    const NANO_BANANA_API_KEY = process.env.NANO_BANANA_API_KEY

    if (!NANO_BANANA_API_KEY) {
      console.error("[v0] NANO_BANANA_API_KEY is not set")
      // Return placeholder data if API key is not set
      return NextResponse.json({
        images: [
          {
            url: "/mountain-blue-sky.png",
            alt: "Mountain landscape 1",
          },
          {
            url: "/green-hills-under-clear-sky.jpg",
            alt: "Mountain landscape 2",
          },
        ],
      })
    }

    // Make request to nano banana API
    const response = await fetch(NANO_BANANA_API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${NANO_BANANA_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Nano banana API returned ${response.status}`)
    }

    const data = await response.json()

    // Transform the API response to match our expected format
    // Adjust this based on the actual nano banana API response structure
    const images =
      data.results?.map((item: any) => ({
        url: item.url || item.image_url,
        alt: item.description || item.alt || "Image from nano banana",
      })) || []

    return NextResponse.json({ images })
  } catch (error) {
    console.error("[v0] Error fetching from nano banana API:", error)

    // Return placeholder images on error
    return NextResponse.json({
      images: [
        {
          url: "/scenic-mountain-view.png",
          alt: "Placeholder image 1",
        },
        {
          url: "/beautiful-landscape.png",
          alt: "Placeholder image 2",
        },
      ],
    })
  }
}

export async function POST(request: Request) {
  try {
    const { context, count = 2 } = await request.json()

    const NANO_BANANA_API_URL = process.env.NANO_BANANA_API_URL || "https://api.nanobanana.io/v1/images"
    const NANO_BANANA_API_KEY = process.env.NANO_BANANA_API_KEY

    if (!NANO_BANANA_API_KEY) {
      console.error("[v0] NANO_BANANA_API_KEY is not set")
      // Return placeholder data if API key is not set
      return NextResponse.json({
        images: [
          {
            url: "/mountain-blue-sky.png",
            alt: "Mountain landscape 1",
          },
          {
            url: "/green-hills-under-clear-sky.jpg",
            alt: "Mountain landscape 2",
          },
        ],
      })
    }

    const response = await fetch(NANO_BANANA_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NANO_BANANA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: context,
        count: count,
        // Add any other nano banana API specific parameters here
      }),
    })

    if (!response.ok) {
      throw new Error(`Nano banana API returned ${response.status}`)
    }

    const data = await response.json()

    // Transform the API response to match our expected format
    // Adjust this based on the actual nano banana API response structure
    const images =
      data.results?.map((item: any) => ({
        url: item.url || item.image_url,
        alt: item.description || item.alt || "Image from nano banana",
      })) || []

    return NextResponse.json({ images })
  } catch (error) {
    console.error("[v0] Error fetching from nano banana API:", error)

    // Return placeholder images on error
    return NextResponse.json({
      images: [
        {
          url: "/scenic-mountain-view.png",
          alt: "Placeholder image 1",
        },
        {
          url: "/beautiful-landscape.png",
          alt: "Placeholder image 2",
        },
      ],
    })
  }
}
