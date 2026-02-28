import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ThemeProvider } from "../components/ThemeProvider";
import "./globals.css";

export const dynamic = "force-dynamic";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Afzal yousaf | Writer",
  description: "Official blog and portfolio of writer Afzal yousaf.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <NavBar />
          <main style={{ flex: 1, paddingTop: '6rem' }}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
