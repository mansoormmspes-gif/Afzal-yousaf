import VideoForm from "../../components/VideoForm";
import styles from "../../dashboard/dashboard.module.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateVideo() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/admin/videos" className={styles.actionBtn}>
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className={styles.title}>Add New Video</h1>
                </div>
            </header>
            <div style={{ marginBottom: "2rem" }}></div>
            <VideoForm />
        </div>
    );
}
