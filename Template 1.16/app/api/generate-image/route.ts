import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    console.log('[v0] Generating image with prompt:', prompt)

    // Call nano banana API for image generation
    const response = await fetch('https://api.nanobanana.io/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add your nano banana API key if required
        // 'Authorization': `Bearer ${process.env.NANO_BANANA_API_KEY}`
      },
      body: JSON.stringify({
        prompt,
        width: 800,
        height: 600,
        num_inference_steps: 30,
      })
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json({ 
      imageUrl: data.images?.[0]?.url || data.url || ''
    })
  } catch (error) {
    console.error('[v0] Error generating image:', error)
    // Return a fallback placeholder image
    return NextResponse.json({ 
      imageUrl: '/beautiful-landscape-with-sky-and-hills.jpg'
    })
  }
}
