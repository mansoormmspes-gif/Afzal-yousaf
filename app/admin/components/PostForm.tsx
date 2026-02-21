"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./PostForm.module.css";
import { Post } from "@/lib/posts";

interface PostFormProps {
    initialData?: Post;
    isEdit?: boolean;
}

export default function PostForm({ initialData, isEdit = false }: PostFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<Partial<Post>>(
        initialData || {
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            coverImage: "",
            category: "",
            readingTime: "",
        }
    );
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEdit
                ? `/api/posts/${initialData?.slug}`
                : "/api/posts";
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/dashboard");
                router.refresh();
            } else {
                alert("Failed to save post");
            }
        } catch (error) {
            alert("Error saving post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.group}>
                <label className={styles.label}>Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
            </div>

            <div className={styles.group}>
                <label className={styles.label}>Slug (Optional, auto-generated if empty)</label>
                <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="my-post-slug"
                />
            </div>

            <div className={styles.group}>
                <label className={styles.label}>Category</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="e.g. Design, Tech"
                    required
                />
            </div>

            <div className={styles.group}>
                <label className={styles.label}>Reading Time</label>
                <input
                    type="text"
                    name="readingTime"
                    value={formData.readingTime}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="e.g. 5 min read"
                />
            </div>

            <div className={styles.group}>
                <label className={styles.label}>Cover Image URL</label>
                <input
                    type="text"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="https://..."
                />
            </div>

            <div className={styles.group}>
                <label className={styles.label}>Excerpt</label>
                <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    className={styles.textarea}
                    rows={3}
                    required
                />
            </div>

            <div className={styles.group}>
                <label className={styles.label}>Content</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className={styles.textarea}
                    rows={15}
                    required
                />
            </div>

            <button type="submit" className={styles.button} disabled={loading}>
                {loading ? "Saving..." : isEdit ? "Update Post" : "Create Post"}
            </button>
        </form>
    );
}
