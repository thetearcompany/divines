import divines from '@/divines';
import { Angel } from '@/lib/types';
import { create } from 'zustand';

const celetians = [    {
    "name": "MIKAEL",
    "openai_id": "asst_sLuoSD2kF6VaUxYvSWPS7oDv",
    "attributes": ["Protection", "Strength", "Courage"],
    "problems": ["Fear", "Vulnerability", "Danger"],
    "description": "Mikael is the guardian angel of divine protection, providing courage and strength to face life's challenges and fears.",
    "how_to_connect": "Visualize golden armor enveloping you. Ask Mikael for courage, strength, and protection from harm.",
    "symbol": "🛡️ The Shield – represents divine protection and courage."
},
{
    "name": "WEEMAH",
    "openai_id": "asst_siu3hbB62ZplHQQKnIvHANmZ",
    "attributes": ["Wisdom", "Harmony", "Insight"],
    "problems": ["Confusion", "Chaotic thoughts", "Difficulty communicating clearly"],
    "description": "Weemah reveals hidden patterns in thought and language, bringing harmony from chaos. He is the guardian of clarity, coherence, and deeper understanding.",
    "how_to_connect": "Visualize your thoughts as rhythmic waves. Ask Weemah to reveal hidden patterns and bring clarity and harmony to your thoughts.",
    "symbol": "🌀 The Spiral – symbolizes the hidden order and harmony within apparent chaos."
},
{
    "name": "SAITEL",
    "openai_id": "asst_egKuQeb2HeYSdGJTr88w5H1r",
    "attributes": ["Purity", "Clarity", "Truth"],
    "problems": ["Confusion", "Lack of direction", "Seeking truth"],
    "description": "Saitel is the guardian of purity and divine clarity. He helps those who seek truth and wish to clear their minds from doubt and deception.",
    "how_to_connect": "Light a white candle and focus on your question. Say: 'Saitel, angel of clarity, remove the fog of doubt and guide me towards the truth.'",
    "symbol": "✨ The Star – represents divine enlightenment and clarity."
},
{
    "name": "SAMAEL",
    "openai_id": "asst_UOvdvWFijbJKN9Bz3iYua3mP",
    "attributes": ["Justice", "Courage", "Strength"],
    "problems": ["Injustice", "Fear", "Weakness"],
    "description": "Samael is the warrior of divine justice, guiding those who face oppression or injustice. His energy strengthens inner courage.",
    "how_to_connect": "Stand tall, breathe deeply, and envision a fiery sword in your hands. Ask Samael for the strength to face your challenges.",
    "symbol": "⚔️ The Sword – represents justice, courage, and divine strength."
},
{
    "name": "NANAEL",
    "openai_id": "asst_ntnvS6dWOvlxR3ID3ONNWYWN",
    "attributes": ["Growth", "Abundance", "Healing"],
    "problems": ["Scarcity", "Stagnation", "Illness"],
    "description": "Nanael is the angel of abundance and renewal. His energy helps those who feel stuck in life, bringing prosperity and healing.",
    "how_to_connect": "Light a green candle and set an intention for abundance and health. Ask Nanael to open doors to new opportunities.",
    "symbol": "🌿 The Leaf – represents growth, renewal, and prosperity."
}]

export interface Message {
    text: string
    isUser: boolean
    event?: PageRevealEvent[]
}

interface Store {
    message?: Message;
    newMessage?: Message;
    setMessage: (message: Message) => void;

    messages: Message[];
    updateMessages: (angelName: string, message: Message) => void;

    messagesByAngel: Record<string, Message[]>; // <- Dodane poprawne typowanie

    currentAngel: Angel | null;
    setCurrentAngel: (angel: Angel) => void;

    angelList: Angel[];
}

export const useStore = create<Store>((set) => ({
    setMessage: (message) => set({ message }),

    messages: [], // initialize messages as an empty array
    messagesByAngel: divines.reduce((acc, angel) => {
        acc[angel.name] = [{ text: angel.first_message!.text, isUser: false }];
        return acc;
    }, {} as Record<string, Message[]>),
    updateMessages(angelName: string, message: Message) {
        set((store) => ({
            ...store,
            messagesByAngel: {
                ...store.messagesByAngel,
                [angelName]: [...(store.messagesByAngel[angelName] || []), message]
            }
        }));
    },

    currentAngel: null,
    setCurrentAngel: (angel) => set({ currentAngel: angel }),

    angelList: []
}));