"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./PostForm.module.css";
import { Video } from "@/lib/videos";

interface VideoFormProps {
    initialData?: Video;
    isEdit?: boolean;
}

export default function VideoForm({ initialData, isEdit = false }: VideoFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<Partial<Video>>(
        initialData || {
            title: "",
            youtubeUrl: "",
        }
    );
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEdit ? `/api/videos/${initialData?.id}` : "/api/videos";
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/videos");
                router.refresh();
            } else {
                alert("Failed to save video");
            }
        } catch (error) {
            alert("Error saving video");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.group}>
                <label className={styles.label}>Video Title</label>
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
                <label className={styles.label}>YouTube URL</label>
                <input
                    type="text"
                    name="youtubeUrl"
                    value={formData.youtubeUrl}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="https://www.youtube.com/watch?v=..."
                    required
                />
            </div>

            <button type="submit" className={styles.button} disabled={loading}>
                {loading ? "Saving..." : isEdit ? "Update Video" : "Create Video"}
            </button>
        </form>
    );
}
