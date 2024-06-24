import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: useRuntimeConfig().openai.apiKey,
})

async function main(subject: string) {
  const result = await openai.images.generate({
    model: 'dall-e-3',
    quality: 'hd',
    size: '1024x1024',
    response_format: 'url',
    prompt: `
        Du erstellst Malvorlagen. Du verwendest ausschließlich Schwarz und Weiß als Farben. Linien sind schwarz. 
        Flächen zum Ausmalen sind weiß. Du wirst das folgende Motiv ohne Rückfragen erstellen. 
        Wenn du unsicher bei Details bist, entscheide selbst.
        Die Motive sollen im Din A4 Format sein.
        VERWENDE KEINE ANDERE FARBE ALS SCHWARZ UND WEISS! KEINE SCHATTEN, KEINE VERLÄUFE! KEIN SHADING! KEINE SCHATTIERUNGEN!
        So wenig Details wie möglich. Damit die Kinder die Motive gut ausmalen können.
        Motiv: ${subject}
      `,
  })
  return result.data[0].url
}

export default eventHandler(async (event) => {
  const { prompt } = getQuery(event)
  const image = await main(prompt as string)
  return image
})
