import Dexie, { Table } from "dexie";
import { Message } from "@/hooks/use-store"; 

class MessageDatabase extends Dexie {
    messages!: Table<Message>;

    constructor() {
        super("DivineChatDB");
        this.version(1).stores({
            messages: "++id, angelName, text, isUser",
        });
    }
}

export const db = new MessageDatabase();