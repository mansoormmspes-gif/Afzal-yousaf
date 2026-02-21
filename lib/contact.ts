import { db } from "./firebase";
import { ref, get, set, remove } from "firebase/database";

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    date: string;
}

export async function getMessages(): Promise<ContactMessage[]> {
    try {
        const messagesRef = ref(db, 'messages');
        const snapshot = await get(messagesRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            const messages = Object.values(data) as ContactMessage[];
            // Sort messages by date descending (newest first)
            return messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
        return [];
    } catch (error) {
        console.error("Error reading messages from Firebase:", error);
        return [];
    }
}

export async function saveMessage(messageData: Omit<ContactMessage, "id" | "date">): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
        ...messageData,
        id: Date.now().toString(),
        date: new Date().toISOString()
    };

    const messageRef = ref(db, `messages/${newMessage.id}`);
    await set(messageRef, newMessage);

    return newMessage;
}

export async function deleteMessage(id: string): Promise<void> {
    const messageRef = ref(db, `messages/${id}`);
    await remove(messageRef);
}
