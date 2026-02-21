"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2, Mail } from "lucide-react";
import styles from "./messages.module.css";
import { ContactMessage } from "@/lib/contact";

export default function AdminMessages() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/messages");
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
            } else {
                if (res.status === 401) {
                    router.push("/admin"); // Redirect if not authenticated
                }
            }
        } catch (error) {
            console.error("Failed to fetch messages", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return;

        try {
            const res = await fetch(`/api/admin/messages/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setMessages(messages.filter((m) => m.id !== id));
            } else {
                alert("Failed to delete message");
            }
        } catch (error) {
            alert("Error deleting message");
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <Link href="/admin/dashboard" className={styles.backBtn}>
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className={styles.title}>Messages</h1>
                </div>
            </header>

            <div className={styles.messagesList}>
                {isLoading ? (
                    <p className={styles.empty}>Loading messages...</p>
                ) : messages.length === 0 ? (
                    <div className={styles.empty}>
                        <Mail size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
                        <p>No messages found.</p>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div key={message.id} className={styles.messageItem}>
                            <div className={styles.messageHeader}>
                                <div className={styles.senderInfo}>
                                    <div className={styles.senderName}>{message.name}</div>
                                    <a href={`mailto:${message.email}`} className={styles.senderEmail}>
                                        {message.email}
                                    </a>
                                </div>
                                <div className={styles.messageDate}>
                                    {new Date(message.date).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </div>
                            <div className={styles.messageContent}>
                                {message.message}
                            </div>
                            <div className={styles.messageActions}>
                                <button
                                    onClick={() => handleDelete(message.id)}
                                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                    aria-label="Delete message"
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
