import { NextResponse } from "next/server";
import { getPosts, savePosts, Post } from "@/lib/posts";
import { cookies } from "next/headers";

// Simple ID generator
const generateId = () => Date.now().toString();

export async function GET() {
    try {
        const posts = await getPosts();
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
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
        if (!body.title || !body.content) {
            return NextResponse.json({ error: "Missing required fields (title, content)" }, { status: 400 });
        }

        const posts = await getPosts();

        const newPost: Post = {
            id: generateId(),
            title: body.title,
            slug: body.slug || body.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
            excerpt: body.excerpt || body.content.substring(0, 150) + "...",
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
        console.error("Error creating post:", error);
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}
