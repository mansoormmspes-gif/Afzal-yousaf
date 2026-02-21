import PostForm from "../components/PostForm";
import styles from "../dashboard/dashboard.module.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreatePost() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/admin/dashboard" className={styles.actionBtn}>
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className={styles.title}>Create New Post</h1>
                </div>
            </header>
            <PostForm />
        </div>
    );
}
