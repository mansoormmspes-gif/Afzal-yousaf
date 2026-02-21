"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, LogOut } from "lucide-react";
import styles from "./dashboard.module.css";
import { Post } from "@/lib/posts";

export default function Dashboard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(data);
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const res = await fetch(`/api/posts/${slug}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setPosts(posts.filter((p) => p.slug !== slug));
            } else {
                alert("Failed to delete post");
            }
        } catch (error) {
            alert("Error deleting post");
        }
    };

    const handleLogout = async () => {
        await fetch("/api/auth", { method: "DELETE" });
        router.push("/admin");
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h2 style={{ fontSize: '1.2rem', color: 'var(--accent)', marginBottom: '0.2rem', fontWeight: 600 }}>Afzal yousaf</h2>
                    <h1 className={styles.title}>Dashboard</h1>
                </div>
                <div className={styles.actions}>
                    <Link href="/" className={styles.homeLink}>
                        View Site
                    </Link>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </header>

            <div className={styles.mainAction} style={{ gap: '1rem', display: 'flex', flexWrap: 'wrap' }}>
                <Link href="/admin/editor" className={styles.createBtn}>
                    <Plus size={20} /> Create New Post
                </Link>
                <Link href="/admin/videos" className={styles.createBtn} style={{ backgroundColor: 'transparent', color: 'var(--foreground)', border: '1px solid var(--border)' }}>
                    Manage Videos
                </Link>
                <Link href="/admin/messages" className={styles.createBtn} style={{ backgroundColor: 'var(--card)', color: 'var(--foreground)', border: '1px solid var(--card-border)' }}>
                    View Messages
                </Link>
            </div>

            <div className={styles.postsList}>
                <div className={styles.listHeader}>
                    <span>Title</span>
                    <span>Date</span>
                    <span>Category</span>
                    <span>Actions</span>
                </div>

                {posts.length === 0 ? (
                    <p className={styles.empty}>No posts found.</p>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className={styles.postItem}>
                            <div className={styles.postTitle}>{post.title}</div>
                            <div>{post.date}</div>
                            <div>{post.category}</div>
                            <div className={styles.postActions}>
                                <Link href={`/admin/editor/${post.slug}`} className={styles.actionBtn}>
                                    <Edit size={18} />
                                </Link>
                                <button
                                    onClick={() => handleDelete(post.slug)}
                                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
