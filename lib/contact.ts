import fs from "fs";
import path from "path";

const messagesDirectory = path.join(process.cwd(), "data");
const messagesFile = path.join(messagesDirectory, "messages.json");

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    date: string;
}

// Helper to ensure the file exists
function ensureFileExists() {
    if (!fs.existsSync(messagesDirectory)) {
        fs.mkdirSync(messagesDirectory, { recursive: true });
    }
    if (!fs.existsSync(messagesFile)) {
        fs.writeFileSync(messagesFile, "[]", "utf-8");
    }
}

export function getMessages(): ContactMessage[] {
    try {
        ensureFileExists();
        const fileContents = fs.readFileSync(messagesFile, "utf8");
        const messages = JSON.parse(fileContents);
        // Sort messages by date descending (newest first)
        return messages.sort((a: ContactMessage, b: ContactMessage) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    } catch (error) {
        console.error("Error reading messages:", error);
        return [];
    }
}

export function saveMessage(messageData: Omit<ContactMessage, "id" | "date">): ContactMessage {
    ensureFileExists();
    const messages = getMessages();

    const newMessage: ContactMessage = {
        ...messageData,
        id: Date.now().toString(),
        date: new Date().toISOString()
    };

    messages.push(newMessage);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), "utf8");
    return newMessage;
}

export function deleteMessage(id: string): void {
    ensureFileExists();
    const messages = getMessages();
    const updatedMessages = messages.filter(msg => msg.id !== id);
    fs.writeFileSync(messagesFile, JSON.stringify(updatedMessages, null, 2), "utf8");
}
