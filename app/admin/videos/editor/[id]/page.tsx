import VideoForm from "../../../components/VideoForm";
import styles from "../../../dashboard/dashboard.module.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getVideoById } from "@/lib/videos";
import { notFound } from "next/navigation";

interface Params {
    params: Promise<{ id: string }>;
}

export default async function EditVideo({ params }: Params) {
    const { id } = await params;
    const video = await getVideoById(id);

    if (!video) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/admin/videos" className={styles.actionBtn}>
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className={styles.title}>Edit Video</h1>
                </div>
            </header>
            <div style={{ marginBottom: "2rem" }}></div>
            <VideoForm initialData={video} isEdit={true} />
        </div>
    );
}
