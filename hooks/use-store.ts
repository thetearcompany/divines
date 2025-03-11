import { Angel } from '@/lib/types';
import { create } from 'zustand';

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
    updateMessages: (message: Message) => void;
    currentAngel: Angel | null;
    setCurrentAngel: (angel: Angel) => void;

    angelList: Angel[];
}

export const useStore = create<Store>((set) => ({
    setMessage: (message) => set({ message }),

    messages: [],
    updateMessages(message: Message) {
        set(store => ({...store, messages: store.messages.concat(message)}))
    },
    currentAngel: null,
    setCurrentAngel: (angel) => set({ currentAngel: angel }),

    angelList: []
}));