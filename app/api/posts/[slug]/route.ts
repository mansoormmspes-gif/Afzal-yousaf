import { NextResponse } from "next/server";
import { getPosts, savePosts } from "@/lib/posts";

interface Params {
    params: Promise<{ slug: string }>;
}

export async function PUT(request: Request, { params }: Params) {
    const { slug } = await params;
    try {
        const body = await request.json();
        const posts = await getPosts();
        const index = posts.findIndex((p) => p.slug === slug);

        if (index === -1) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        posts[index] = { ...posts[index], ...body };
        await savePosts(posts);

        return NextResponse.json(posts[index]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: Params) {
    const { slug } = await params;
    try {
        const posts = await getPosts();
        const newPosts = posts.filter((p) => p.slug !== slug);
        await savePosts(newPosts);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
    }
}
