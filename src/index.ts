import { googleAI } from '@genkit-ai/googleai';
import { defineFlow, runFlow } from '@genkit-ai/flow';
import { genkit } from 'genkit';
import * as z from 'zod';

// Create the AI instance
const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model('gemini-1.0-pro'), // Default model
});

export const eli5Flow = defineFlow(
  {
    name: 'eli5Flow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (prompt) => {
    const llmResponse = await ai.generate({
      model: googleAI.model('gemini-1.0-pro'),
      prompt: `Jelaskan "${prompt}" seolah-olah saya berumur 5 tahun.`,
    });

    return llmResponse.text;
  }
);

export async function jelaskan(prompt: string) {
  return await runFlow(eli5Flow, prompt);
}
