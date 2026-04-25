import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

function getGroq() {
  return new Groq({
    apiKey: process.env.GROQ_API_KEY,
  })
}

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mimeType } = await req.json()

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'Image requise' },
        { status: 400 }
      )
    }

    const response = await getGroq().chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType || 'image/jpeg'};base64,${imageBase64}`,
              },
            },
            {
              type: 'text',
              text: `Tu es un expert en gestion des déchets urbains à Parakou, Bénin.
Analyse cette image et réponds UNIQUEMENT en JSON avec ce format exact :
{
  "gravite": "LEGER" | "MODERE" | "CRITIQUE",
  "description": "Description courte de la situation (max 100 mots)",
  "recommandation": "Action recommandée pour les collecteurs (max 50 mots)",
  "score": number (0-100)
}
- LEGER : quelques déchets, pas urgent
- MODERE : accumulation visible, intervention sous 48h
- CRITIQUE : dépôt sauvage massif, danger sanitaire, intervention immédiate`,
            },
          ],
        },
      ],
      max_tokens: 500,
    })

    const content = response.choices[0]?.message?.content || ''

    // Extraire le JSON de la réponse
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json(
        { error: 'Réponse IA invalide' },
        { status: 500 }
      )
    }

    const analyse = JSON.parse(jsonMatch[0])
    return NextResponse.json(analyse)
  } catch (error) {
    console.error('Erreur Groq:', error)
    return NextResponse.json(
      { error: 'Erreur analyse IA' },
      { status: 500 }
    )
  }
}