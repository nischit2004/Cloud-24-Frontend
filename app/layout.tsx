import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cloud Queries",
  description: "Basic frontend for Cloud Computing query submissions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <nav className="nav" aria-label="Main navigation">
              <Link href="/" className="brand">
                Cloud Queries
              </Link>
              <div className="nav-links">
                <Link href="/" className="nav-link">
                  View Queries
                </Link>
                <Link href="/new" className="nav-link">
                  Add Query
                </Link>
              </div>
            </nav>
          </header>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
