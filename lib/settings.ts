import { db } from "./firebase";
import { ref, get, set } from "firebase/database";

export interface SiteSettings {
    heroIntro: string;
    heroDescription: string;
    footerDescription: string;
    aboutIntro: string;
    aboutBio1: string;
    aboutBio2: string;
    aboutBio3: string;
    aboutPhoto: string;
}

const defaultSettings: SiteSettings = {
    heroIntro: "Writer & Storyteller",
    heroDescription: "Exploring the intersection of minimalism, technology, and design. Sharing thoughts on writing, creativity, and navigating the digital age.",
    footerDescription: "Writer, thinker, and storyteller.",
    aboutIntro: "Minimalist. Writer. Observer of the digital age.",
    aboutBio1: "Hello! I'm Afzal yousaf. Based in a quiet corner of the world, I spend my days exploring the nuances of modern life, technology, and design. My writing focuses on finding clarity in a complex world and helping others do the same.",
    aboutBio2: "With a background in literature and a passion for digital aesthetics, I believe that good design and good writing share the same principles: simplicity, structure, and purpose.",
    aboutBio3: "This blog is my digital garden—a collection of thoughts, essays, and experiments. I hope you find something here that resonates with you.",
    aboutPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
};

export async function getSettings(): Promise<SiteSettings> {
    try {
        const settingsRef = ref(db, 'settings');
        const snapshot = await get(settingsRef);
        if (snapshot.exists()) {
            return { ...defaultSettings, ...snapshot.val() };
        }
        return defaultSettings;
    } catch (error) {
        console.error("Error reading settings from Firebase:", error);
        return defaultSettings;
    }
}

export async function updateSettings(newSettings: Partial<SiteSettings>): Promise<void> {
    const currentSettings = await getSettings();
    const updated = { ...currentSettings, ...newSettings };
    const settingsRef = ref(db, 'settings');
    await set(settingsRef, updated);
}
