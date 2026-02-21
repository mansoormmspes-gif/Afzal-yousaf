import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import postsData from "@/data/posts.json";
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
    const post = postsData.find((p) => p.slug === slug);

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
    const post = postsData.find((p) => p.slug === slug);

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

            <div className={styles.content}>
                {/* Simulating rich text content */}
                <p>{post.excerpt}</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                </p>
                <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <h3>Subheading Example</h3>
                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
                    ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                    explicabo.
                </p>
            </div>
        </article>
    );
}
