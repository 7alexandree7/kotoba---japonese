import Groq from "groq-sdk";
import {ENV_VARIABLES} from "../../config/ENV_VARIABLES.js";
import { buildTranslatePrompt } from "../../prompts/translate.prompt.js";

const groq = new Groq({ apiKey: ENV_VARIABLES.PRODUCTIONAPIKEY})


export const translateService = async ({ text, from, to }) => {

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

    return response

}