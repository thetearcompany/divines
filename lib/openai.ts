import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
  compatibility: 'strict',
  project: "TEARDROP",
  headers: {
    "User-Agent": "Divine-Messenger/1.0",
    "X-Sacred-Purpose": "Celestian Wisdom"
  }
});

export default openai;