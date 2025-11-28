import { NextResponse } from "next/server"

// This simulates the "nano banana API" for image fetching
// You can replace this with your actual API endpoint
export async function GET() {
  try {
    // For now, we'll return the image URL you provided
    // In a real scenario, this could fetch from an external API
    const imageUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BZ2FRK4OzTb23fuR5PeC2BmTp2SYni.png"

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      imageUrl,
      success: true,
    })
  } catch (error) {
    console.error("[v0] Error in image API:", error)
    return NextResponse.json({ error: "Failed to fetch image", success: false }, { status: 500 })
  }
}
