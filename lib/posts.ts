import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "posts.json");

export interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    date: string;
    category: string;
    author: string;
    readingTime: string;
}

export async function getPosts(): Promise<Post[]> {
    try {
        console.log("Reading posts from:", dataFilePath);
        const data = await fs.readFile(dataFilePath, "utf8");
        const posts = JSON.parse(data);
        console.log(`Successfully read ${posts.length} posts.`);
        return posts;
    } catch (error) {
        console.error("Error reading posts:", error);
        return [];
    }
}

export async function savePosts(posts: Post[]): Promise<void> {
    await fs.writeFile(dataFilePath, JSON.stringify(posts, null, 2), "utf8");
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
    const posts = await getPosts();
    return posts.find((p) => p.slug === slug);
}
