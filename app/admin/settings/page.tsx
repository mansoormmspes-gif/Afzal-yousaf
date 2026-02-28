"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, ArrowLeft } from "lucide-react";
import styles from "../../contact/page.module.css";
import { SiteSettings } from "@/lib/settings";

export default function SettingsAdmin() {
    const router = useRouter();
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [saving, setSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchSettings = async () => {
            const res = await fetch("/api/settings");
            if (res.ok) {
                const data = await res.json();
                setSettings(data);
            }
        };
        fetchSettings();
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        setMessage("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                if (data.url) {
                    setSettings((prev) => prev ? { ...prev, aboutPhoto: data.url } : null);
                    setMessage("Photo uploaded successfully! Don't forget to save settings.");
                }
            } else {
                setMessage("Failed to upload photo.");
            }
        } catch (error) {
            setMessage("An error occurred during upload.");
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage("");

        try {
            const res = await fetch("/api/settings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                setMessage("Settings saved successfully!");
                setTimeout(() => setMessage(""), 3000);
            } else {
                setMessage("Failed to save settings.");
            }
        } catch (error) {
            setMessage("An error occurred while saving.");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSettings((prev) => prev ? { ...prev, [name]: value } : null);
    };

    if (!settings) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading settings...</div>;
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 className={styles.title} style={{ margin: 0 }}>Site Settings</h1>
                    <p style={{ color: 'var(--accent)', marginTop: '0.5rem' }}>Update static text across the website.</p>
                </div>
                <Link href="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', textDecoration: 'none' }}>
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>
            </header>

            {message && (
                <div style={{
                    padding: '1rem',
                    marginBottom: '2rem',
                    borderRadius: '8px',
                    backgroundColor: message.includes("success") ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                    color: message.includes("success") ? 'var(--accent)' : '#ff4444',
                    border: `1px solid ${message.includes("success") ? 'var(--accent)' : '#ff4444'}`
                }}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Hero Settings */}
                <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--card)' }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--foreground)' }}>Hero Section (Home)</h2>

                    <div className={styles.group}>
                        <label className={styles.label}>Intro Subtitle</label>
                        <input
                            type="text"
                            name="heroIntro"
                            value={settings.heroIntro}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.group}>
                        <label className={styles.label}>Description</label>
                        <textarea
                            name="heroDescription"
                            value={settings.heroDescription}
                            onChange={handleChange}
                            className={styles.input}
                            rows={3}
                            required
                        />
                    </div>
                </div>

                {/* About Settings */}
                <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--card)' }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--foreground)' }}>About Page</h2>

                    <div className={styles.group}>
                        <label className={styles.label}>Intro Text</label>
                        <input
                            type="text"
                            name="aboutIntro"
                            value={settings.aboutIntro}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.group}>
                        <label className={styles.label}>Bio Paragraph 1</label>
                        <textarea
                            name="aboutBio1"
                            value={settings.aboutBio1}
                            onChange={handleChange}
                            className={styles.input}
                            rows={3}
                            required
                        />
                    </div>

                    <div className={styles.group}>
                        <label className={styles.label}>Bio Paragraph 2</label>
                        <textarea
                            name="aboutBio2"
                            value={settings.aboutBio2}
                            onChange={handleChange}
                            className={styles.input}
                            rows={3}
                            required
                        />
                    </div>

                    <div className={styles.group}>
                        <label className={styles.label}>Bio Paragraph 3</label>
                        <textarea
                            name="aboutBio3"
                            value={settings.aboutBio3}
                            onChange={handleChange}
                            className={styles.input}
                            rows={2}
                            required
                        />
                    </div>

                    <div className={styles.group}>
                        <label className={styles.label}>Photo</label>

                        {settings.aboutPhoto && (
                            <div style={{ marginBottom: "1rem" }}>
                                <div style={{ marginBottom: "0.5rem", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border)", width: "fit-content" }}>
                                    <img
                                        src={settings.aboutPhoto}
                                        alt="About Preview"
                                        style={{ width: "200px", height: "auto", display: "block" }}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSettings((prev) => prev ? { ...prev, aboutPhoto: "" } : null)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "#ef4444",
                                        fontSize: "0.9rem",
                                        cursor: "pointer",
                                        padding: 0,
                                        textDecoration: "underline"
                                    }}
                                >
                                    Remove Photo
                                </button>
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className={styles.input}
                            disabled={uploadingImage}
                            style={{ padding: '0.5rem', cursor: uploadingImage ? 'wait' : 'pointer' }}
                        />
                        {uploadingImage && <p style={{ fontSize: '0.9rem', color: 'var(--accent)', marginTop: '0.5rem' }}>Uploading photo...</p>}
                    </div>
                </div>

                {/* Footer Settings */}
                <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--card)' }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--foreground)' }}>Footer</h2>

                    <div className={styles.group}>
                        <label className={styles.label}>Description</label>
                        <input
                            type="text"
                            name="footerDescription"
                            value={settings.footerDescription}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className={styles.button}
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                    disabled={saving}
                >
                    <Save size={18} /> {saving ? "Saving..." : "Save Settings"}
                </button>
            </form>
        </div>
    );
}
