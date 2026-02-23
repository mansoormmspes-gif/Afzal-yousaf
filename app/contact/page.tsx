"use client";

import styles from "./page.module.css";
import { Mail, Phone } from "lucide-react";
import { useState, FormEvent } from "react";

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus("success");
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Failed to send message", error);
            setStatus("error");
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Contact</h1>
                <p className={styles.intro}>
                    Have a question or want to work together? Drop me a message.
                </p>
            </header>

            <div className={styles.contactInfo}>
                <a href="mailto:afzlysf@gmail.com" className={styles.infoCard}>
                    <Mail className={styles.infoIcon} size={24} />
                    <div className={styles.infoText}>
                        <span className={styles.infoLabel}>Email</span>
                        <span className={styles.infoValue}>afzlysf@gmail.com</span>
                    </div>
                </a>

                <a href="tel:+917909146549" className={styles.infoCard}>
                    <Phone className={styles.infoIcon} size={24} />
                    <div className={styles.infoText}>
                        <span className={styles.infoLabel}>Phone</span>
                        <span className={styles.infoValue}>+91 790 914 6549</span>
                    </div>
                </a>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <label htmlFor="name" className={styles.label}>
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className={styles.input}
                        placeholder="Your name"
                        required
                        disabled={status === "loading"}
                    />
                </div>

                <div className={styles.group}>
                    <label htmlFor="email" className={styles.label}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={styles.input}
                        placeholder="your@email.com"
                        required
                        disabled={status === "loading"}
                    />
                </div>

                <div className={styles.group}>
                    <label htmlFor="message" className={styles.label}>
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        className={styles.textarea}
                        placeholder="Tell me about your project..."
                        required
                        disabled={status === "loading"}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className={styles.button}
                    disabled={status === "loading"}
                    style={{
                        opacity: status === "loading" ? 0.7 : 1,
                        cursor: status === "loading" ? "not-allowed" : "pointer",
                        transition: "all 0.3s ease"
                    }}
                >
                    {status === "loading" ? "Sending..." : "Send Message"}
                </button>

                {status === "success" && (
                    <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--card)', color: 'var(--foreground)', border: '1px solid var(--accent)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                        Message sent successfully! I'll get back to you soon.
                    </div>
                )}
                {status === "error" && (
                    <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                        Failed to send message. Please try again.
                    </div>
                )}
            </form>
        </div>
    );
}
