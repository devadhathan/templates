import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") || "microscopic"

  // Generate different banana-themed image URLs based on type
  const imageQueries = {
    microscopic: "nano banana under microscope scientific close up view with cellular structure",
    laboratory: "banana in scientific laboratory research setting with equipment and analysis tools",
  }

  const query = imageQueries[type as keyof typeof imageQueries] || imageQueries.microscopic
  const imageUrl = `/placeholder.svg?height=280&width=400&query=${encodeURIComponent(query)}`

  return NextResponse.json({
    imageUrl,
    query,
    type,
    metadata: {
      apiVersion: "1.0",
      source: "nano-banana-api",
      timestamp: new Date().toISOString(),
      dimensions: { width: 400, height: 280 },
    },
  })
}
