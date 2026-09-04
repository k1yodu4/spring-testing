import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shop App",
  description: "E-commerce store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      {/* Sử dụng font sans-serif mặc định thay cho các biến font Geist */}
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}