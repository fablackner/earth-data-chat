import { createOpenAI } from '@ai-sdk/openai';

export function getModel() {
  const baseURL =
    process.env.OPENAI_BASE_URL || 'https://api.deepinfra.com/v1/openai';
  const isDeepInfra = baseURL.includes('deepinfra.com');
  const defaultModel = isDeepInfra
    ? 'deepseek-ai/DeepSeek-V4-Flash'
    : 'gpt-5.4-mini';

  const provider = createOpenAI({
    baseURL,
    apiKey: process.env.OPENAI_API_KEY || process.env.DEEPINFRA_API_KEY,
  });

  return provider.chat(process.env.OPENAI_MODEL || defaultModel);
}

export const model = getModel();
