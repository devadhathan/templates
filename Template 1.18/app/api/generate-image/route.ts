import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    // Call the nano banana API
    const response = await fetch('https://api.nanobanana.com/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add API key from environment variable if needed
        ...(process.env.NANO_BANANA_API_KEY && {
          'Authorization': `Bearer ${process.env.NANO_BANANA_API_KEY}`
        })
      },
      body: JSON.stringify({
        prompt,
        // Add any additional nano banana API parameters here
        width: 640,
        height: 720,
      })
    })

    if (!response.ok) {
      throw new Error(`Nano banana API error: ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json({ 
      imageUrl: data.imageUrl || data.image || data.url 
    })
  } catch (error) {
    console.error('[v0] Error calling nano banana API:', error)
    
    // Return fallback placeholder
    return NextResponse.json({ 
      imageUrl: '/landscape-with-rolling-green-hills-and-blue-sky.jpg',
      error: 'Failed to generate image'
    }, { status: 200 })
  }
}
