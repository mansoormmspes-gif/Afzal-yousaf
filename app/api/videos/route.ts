import { NextResponse } from "next/server";
import { getVideos, saveVideos, Video } from "@/lib/videos";
import { cookies } from "next/headers";

const generateId = () => Date.now().toString();

export async function GET() {
    try {
        const videos = await getVideos();
        return NextResponse.json(videos.reverse()); // Newest first
    } catch (error) {
        console.error("Error fetching videos:", error);
        return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        // Authentication check
        const cookieStore = await cookies();
        const adminToken = cookieStore.get("admin_token");
        if (!adminToken || adminToken.value !== "authenticated") {
            return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
        }

        const body = await request.json();

        // Input validation
        if (!body.title || !body.youtubeUrl) {
            return NextResponse.json({ error: "Missing required fields (title, youtubeUrl)" }, { status: 400 });
        }

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
        console.error("Error creating video:", error);
        return NextResponse.json({ error: "Failed to create video" }, { status: 500 });
    }
}
