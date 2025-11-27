import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!process.env.NANO_API_KEY) {
      console.error('[v0] NANO_API_KEY not found')
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    console.log('[v0] Generating image with prompt:', prompt)

    // Call Nano Banana API for image generation
    const response = await fetch('https://api.nanobanana.io/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NANO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `High-quality professional photograph: ${prompt}. Style: clean, modern, realistic with good lighting and composition.`,
        width: 600,
        height: 400,
        steps: 30,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[v0] API error:', errorText)
      return NextResponse.json(
        { error: 'Failed to generate image' },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    if (data.image || data.url) {
      console.log('[v0] Image generated successfully')
      return NextResponse.json({ 
        imageUrl: data.image || data.url 
      })
    }

    console.error('[v0] No image in response')
    return NextResponse.json(
      { error: 'No image generated' },
      { status: 500 }
    )
  } catch (error: any) {
    console.error('[v0] Error generating image:', error.message)
    return NextResponse.json(
      { error: error.message || 'Failed to generate image' },
      { status: 500 }
    )
  }
}
