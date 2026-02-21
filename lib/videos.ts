import { db } from "./firebase";
import { ref, get, set } from "firebase/database";

export interface Video {
    id: string;
    title: string;
    youtubeUrl: string;
    date: string;
}

export async function getVideos(): Promise<Video[]> {
    try {
        const videosRef = ref(db, 'videos');
        const snapshot = await get(videosRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            const videos = Object.values(data) as Video[];
            return videos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
        return [];
    } catch (error) {
        console.error("Error reading videos from Firebase:", error);
        return [];
    }
}

export async function saveVideos(videos: Video[]): Promise<void> {
    const videosRef = ref(db, 'videos');
    const videosObject = videos.reduce((acc, video) => {
        acc[video.id] = video;
        return acc;
    }, {} as Record<string, Video>);
    await set(videosRef, videosObject);
}

export async function getVideoById(id: string): Promise<Video | undefined> {
    const videos = await getVideos();
    return videos.find((v) => v.id === id);
}
