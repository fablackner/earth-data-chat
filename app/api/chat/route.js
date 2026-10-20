import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
} from 'ai';

import { buildInstructions } from '@/lib/instructions';
import { allTools } from '@/lib/mcp';
import { getModel } from '@/lib/model';

export const maxDuration = 60;

export async function POST(req) {
  const { messages } = await req.json();
  const { tools, instructions } = await allTools();

  const result = streamText({
    model: getModel(),
    instructions: buildInstructions(instructions),
    messages: await convertToModelMessages(messages),
    tools,
    // Several steps for call → result → follow-up; the cap stops a loop.
    stopWhen: isStepCount(6),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
