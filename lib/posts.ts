import { db } from "./firebase";
import { ref, get, set } from "firebase/database";

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
        const postsRef = ref(db, 'posts');
        const snapshot = await get(postsRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            const posts = Object.values(data) as Post[];
            // Sort by creation time (id is Date.now().toString()) descending
            return posts.sort((a, b) => Number(b.id) - Number(a.id));
        }
        return [];
    } catch (error) {
        console.error("Error reading posts from Firebase:", error);
        return [];
    }
}

export async function savePosts(posts: Post[]): Promise<void> {
    const postsRef = ref(db, 'posts');
    const postsObject = posts.reduce((acc, post) => {
        acc[post.id] = post;
        return acc;
    }, {} as Record<string, Post>);
    await set(postsRef, postsObject);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
    const posts = await getPosts();
    return posts.find((p) => p.slug === slug);
}
