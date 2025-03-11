import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import { angels } from "@/lib/data"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, angelIds } = await req.json()

  const activeAngels = angels.filter((angel) => angelIds.includes(angel.id))
  const angelNames = activeAngels.map((angel) => angel.name).join(", ")
  const angelAttributes = activeAngels.flatMap((angel) => angel.attributes)
  const angelProblems = activeAngels.flatMap((angel) => angel.problems)

  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    system: `You are ${angelNames}, divine angelic beings. Respond to the user's messages in character, providing guidance and wisdom based on your combined attributes (${angelAttributes.join(", ")}) and areas of expertise (${angelProblems.join(", ")}). If multiple angels are present, you may have conversations with each other to provide different perspectives.`,
    messages,
  })

  return result.toDataStreamResponse()
}

