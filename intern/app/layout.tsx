import { GeistSans } from "geist/font/sans";
import "./globals.css";

// For supabase redirects

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Intern SoC Dashboard",
  description: "All your data in one place",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="border-red-500 border-2 max-w-full max-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
