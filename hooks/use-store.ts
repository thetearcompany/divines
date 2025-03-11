import { Angel } from '@/lib/types';
import { create } from 'zustand';

interface Store {
    message: string;
    setMessage: (message: string) => void;

    messages: string[];
    updateMessages: (message: string) => void;
    currentAngel: Angel | null;
    setCurrentAngel: (angel: Angel) => void;

    angelList: Angel[];
}

export const useStore = create<Store>((set) => ({
    message: "",
    setMessage: (message) => set({ message }),

    messages: [],
    updateMessages(message: string) {
        this.messages = this.messages.concat(message)
        set(store => ({...store, messages: store.messages.concat(message)}))
    },
    currentAngel: null,
    setCurrentAngel: (angel) => set({ currentAngel: angel }),

    angelList: []
}));