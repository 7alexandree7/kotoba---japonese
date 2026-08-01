import Groq from "groq-sdk";
import { ENV_VARIABLES } from "../../config/ENV_VARIABLES.js";
import { buildTranslatePrompt } from "../../prompts/translate.prompt.js";
import { th } from "zod/v4/locales";

const groq = new Groq({ apiKey: ENV_VARIABLES.PRODUCTIONAPIKEY })


export const translateService = async ({ text, from, to }) => {
    try {
        const prompt = buildTranslatePrompt({ text, from, to })

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        })

        const result = JSON.parse(response.choices[0].message.content)

        return result

    } catch (error) {
        throw new Error(`Error translating or fail to comunicate with AI : ${error.message}`);
    }
}