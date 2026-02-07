import "./globals.css";

export const metadata = {
  title: "Portfolio",
  description: "Developed With NextJS",
  // Next.js will automatically use app/icon.svg if present, 
  // but we can clean up the explicit reference to the old favicon.ico
  icons: {
    icon: '/icon.svg', // Explicitly pointing to our new SVG just in case, though Next.js auto-discovers in app/
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}