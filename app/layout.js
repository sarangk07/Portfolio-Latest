
import "./globals.css";

export const metadata = {
  title: "Portfolio",
  description: "Developed With NextJS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}