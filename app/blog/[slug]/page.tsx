import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { getPostBySlug } from "@/lib/posts";
import styles from "./page.module.css";
import { Metadata } from "next";

// This is correct for Next.js 15+ (async params is expected)
// However, the types provided by create-next-app might trigger warnings if we don't define Props correctly
// We'll stick to standard usage.

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    return {
        title: `${post.title} | Afzal yousaf`,
        description: post.excerpt,
    };
}

export default async function BlogPost({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className={styles.container}>
            <Link href="/" className={styles.backLink}>
                <ArrowLeft size={16} style={{ marginRight: "0.5rem" }} /> Back to Home
            </Link>

            <header className={styles.header}>
                <div className={styles.meta}>
                    <span className={styles.category}>{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} />
                        <span>{post.readingTime}</span>
                    </div>
                </div>
                <h1 className={styles.title}>{post.title}</h1>
            </header>

            <div className={styles.coverImageWrapper}>
                <img
                    src={post.coverImage}
                    alt={post.title}
                    className={styles.coverImage}
                />
            </div>

            <div className={styles.content} style={{ whiteSpace: 'pre-wrap' }}>
                {post.content}
            </div>
        </article>
    );
}
