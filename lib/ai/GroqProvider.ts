import Groq from "groq-sdk";
import { AIProvider, AIRequest, AIResponse } from "./AIProvider";

const MODEL = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";
const TEMPERATURE = parseFloat(process.env.GROQ_TEMPERATURE ?? "0.7");
const MAX_TOKENS = parseInt(process.env.GROQ_MAX_TOKENS ?? "1024", 10);
const MAX_RETRIES = 2;

export class GroqProvider implements AIProvider {
  private client: Groq;

  constructor() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("GROQ_API_KEY is not set");
    this.client = new Groq({ apiKey });
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    const temperature = request.temperature ?? TEMPERATURE;
    const maxTokens = request.maxTokens ?? MAX_TOKENS;
    const model = MODEL;

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const completion = await this.client.chat.completions.create({
          model,
          temperature,
          max_tokens: maxTokens,
          messages: [
            { role: "system", content: request.systemPrompt },
            { role: "user", content: request.userPrompt },
          ],
        });

        const text = completion.choices[0]?.message?.content ?? "";
        if (!text) throw new Error("Empty response from Groq");

        return {
          success: true,
          text: text.trim(),
          model: completion.model,
          usage: completion.usage
            ? {
                promptTokens: completion.usage.prompt_tokens,
                completionTokens: completion.usage.completion_tokens,
                totalTokens: completion.usage.total_tokens,
              }
            : undefined,
        };
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        if (attempt < MAX_RETRIES) continue;
      }
    }

    console.error("[GroqProvider] generation failed:", lastError?.message);
    return { success: false, text: "", model, usage: undefined };
  }
}
