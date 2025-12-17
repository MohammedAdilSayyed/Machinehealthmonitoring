import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "./globals.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Machine Health Monitoring",
  description: "Real-time machine health monitoring dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className={styles.container}>
          <Sidebar />
          <div className={styles.mainWrapper}>
            <Header />
            <main className={styles.main}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
