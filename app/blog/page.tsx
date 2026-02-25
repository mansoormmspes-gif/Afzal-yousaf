import styles from "./page.module.css";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/posts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Afzal yousaf",
    description: "Read the latest thoughts and stories from Afzal yousaf.",
};

export const revalidate = 60; // Use ISR to serve lightning-fast pages and update in background

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>The Blog</h1>
                <p className={styles.intro}>
                    Thoughts on minimalism, design, and the digital life.
                </p>
            </header>

            <div className={styles.grid}>
                {posts.length > 0 ? (
                    posts.map((post) => <PostCard key={post.id} post={post} />)
                ) : (
                    <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "var(--muted-foreground)" }}>
                        No posts found. Check back later!
                    </p>
                )}
            </div>
        </div>
    );
}
