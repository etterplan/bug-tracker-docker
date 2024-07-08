import { OpenAI } from 'openai';

const openaiApiKey: string = process.env.OPENAI_API_KEY || '';
const openai: OpenAI = new OpenAI({ apiKey: openaiApiKey });

export default openai;