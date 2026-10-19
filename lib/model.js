import { openai } from '@ai-sdk/openai';

// Override with OPENAI_MODEL.
export const model = openai(process.env.OPENAI_MODEL ?? 'gpt-5.4-mini');
