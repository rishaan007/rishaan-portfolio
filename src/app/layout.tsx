import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rishaan Kumar — AI/ML & Data Science Enthusiast",
  description:
    "Portfolio of Rishaan Kumar — Information Technology undergraduate exploring Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision, and Full-Stack Development.",
  keywords: [
    "Rishaan Kumar",
    "AI",
    "Machine Learning",
    "Data Science",
    "Portfolio",
    "Computer Vision",
    "Deep Learning",
    "Full Stack Developer",
  ],
  authors: [{ name: "Rishaan Kumar" }],
  openGraph: {
    title: "Rishaan Kumar — AI/ML & Data Science Enthusiast",
    description:
      "Portfolio of Rishaan Kumar — Information Technology undergraduate exploring AI, ML, and Full-Stack Development.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Cinzel+Decorative:wght@700;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400&family=Inter:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[var(--ivory)] text-[var(--espresso)] font-sans antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "var(--ivory)",
              border: "1px solid var(--cream)",
              color: "var(--espresso)",
            },
          }}
        />
      </body>
    </html>
  );
}
