import { NextResponse } from "next/server";
import { getVideos, saveVideos } from "@/lib/videos";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const videos = await getVideos();

        const videoIndex = videos.findIndex((v) => v.id === id);
        if (videoIndex === -1) {
            return NextResponse.json({ error: "Video not found" }, { status: 404 });
        }

        videos[videoIndex] = { ...videos[videoIndex], ...body };
        await saveVideos(videos);

        return NextResponse.json(videos[videoIndex]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update video" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const videos = await getVideos();
        const filteredVideos = videos.filter((v) => v.id !== id);

        if (videos.length === filteredVideos.length) {
            return NextResponse.json({ error: "Video not found" }, { status: 404 });
        }

        await saveVideos(filteredVideos);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete video" }, { status: 500 });
    }
}
