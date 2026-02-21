import PostForm from "../../components/PostForm";
import styles from "../../dashboard/dashboard.module.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

interface Params {
    params: Promise<{ slug: string }>;
}

export default async function EditPost({ params }: Params) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/admin/dashboard" className={styles.actionBtn}>
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className={styles.title}>Edit Post</h1>
                </div>
            </header>
            <div style={{ marginBottom: "2rem" }}></div>
            <PostForm initialData={post} isEdit={true} />
        </div>
    );
}
