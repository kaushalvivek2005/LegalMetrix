import { config } from 'dotenv'
config({ path: '.env.local' })  

console.log('KEY:', process.env.AI_GATEWAY_API_KEY) 
import { streamText } from 'ai'

async function main() {
  const result = streamText({
    model: 'openai/gpt-6-astra',
    prompt: 'Why is the sky blue?',
  })

  for await (const chunk of result.textStream) {
    process.stdout.write(chunk)
  }
}

main()