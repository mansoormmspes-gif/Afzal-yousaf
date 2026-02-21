import { NextResponse } from "next/server";
import { getVideos, saveVideos, Video } from "@/lib/videos";

const generateId = () => Date.now().toString();

export async function GET() {
    try {
        const videos = await getVideos();
        return NextResponse.json(videos.reverse()); // Newest first
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const videos = await getVideos();

        const newVideo: Video = {
            id: generateId(),
            title: body.title,
            youtubeUrl: body.youtubeUrl,
            date: new Date().toISOString().split("T")[0],
        };

        videos.push(newVideo);
        await saveVideos(videos);

        return NextResponse.json(newVideo, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create video" }, { status: 500 });
    }
}
