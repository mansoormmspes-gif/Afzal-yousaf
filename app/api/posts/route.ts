import { NextResponse } from "next/server";
import { getPosts, savePosts, Post } from "@/lib/posts";

// Simple ID generator
const generateId = () => Date.now().toString();

export async function GET() {
    const posts = await getPosts();
    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const posts = await getPosts();

        const newPost: Post = {
            id: generateId(),
            title: body.title,
            slug: body.slug || body.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
            excerpt: body.excerpt,
            content: body.content,
            coverImage: body.coverImage || "https://images.unsplash.com/photo-1542332213-31f87348057f",
            date: new Date().toISOString().split("T")[0],
            category: body.category || "General",
            author: "Afzal yousaf",
            readingTime: body.readingTime || "5 min read",
        };

        posts.unshift(newPost);
        await savePosts(posts);

        return NextResponse.json(newPost);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}
