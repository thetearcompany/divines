import { create } from "zustand";
import { db } from "@/lib/db";

export interface Message {
    id?: number;
    angelName: string;
    text: string;
    isUser: boolean;
}

interface Store {
    messagesByAngel: Record<string, Message[]>;
    updateMessages: (angelName: string, message: Message) => void;
    loadMessages: () => Promise<void>;
}

export const useStore = create<Store>((set) => ({
    messagesByAngel: {},

    updateMessages: async (angelName, message) => {
        await db.messages.add({ ...message, angelName });

        set((state) => ({
            messagesByAngel: {
                ...state.messagesByAngel,
                [angelName]: [...(state.messagesByAngel[angelName] || []), message],
            },
        }));
    },

    loadMessages: async () => {
        const messages = await db.messages.toArray();
        const groupedMessages: Record<string, Message[]> = {};

        messages.forEach((msg) => {
            if (!groupedMessages[msg.angelName]) {
                groupedMessages[msg.angelName] = [];
            }
            groupedMessages[msg.angelName].push(msg);
        });

        set({ messagesByAngel: groupedMessages });
    },
}));