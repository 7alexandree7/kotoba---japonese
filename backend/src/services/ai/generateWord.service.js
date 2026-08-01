import Groq from "groq-sdk";
import {ENV_VARIABLES} from "../../config/ENV_VARIABLES.js";
import { buildGenerateWordPrompt } from "../../prompts/generateWord.prompt.js";

const groq = new Groq({ apiKey: ENV_VARIABLES.PRODUCTIONAPIKEY})


export const generateWordService = async ({ word }) => {
    try {
        const prompt = buildGenerateWordPrompt({ word })
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
        throw new Error(`Error generating word or fail to comunicate with AI : ${error.message}`);
    }
}