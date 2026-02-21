import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "videos.json");

export interface Video {
    id: string;
    title: string;
    youtubeUrl: string;
    date: string;
}

export async function getVideos(): Promise<Video[]> {
    try {
        const data = await fs.readFile(dataFilePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist or is empty, return empty array
        return [];
    }
}

export async function saveVideos(videos: Video[]): Promise<void> {
    await fs.writeFile(dataFilePath, JSON.stringify(videos, null, 2), "utf8");
}

export async function getVideoById(id: string): Promise<Video | undefined> {
    const videos = await getVideos();
    return videos.find((v) => v.id === id);
}
