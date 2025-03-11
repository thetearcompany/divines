import { Angel } from '@/lib/types';
import { create } from 'zustand';

interface Store {
    message: string;
    setMessage: (message: string) => void;

    currentAngel: Angel | null;
    setCurrentAngel: (angel: Angel) => void;

    angelList: Angel[];
}

export const useStore = create<Store>((set) => ({
    message: "",
    setMessage: (message) => set({ message }),

    currentAngel: null,
    setCurrentAngel: (angel) => set({ currentAngel: angel }),

    angelList: []
}));