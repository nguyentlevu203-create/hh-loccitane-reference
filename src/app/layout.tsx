import type { Metadata } from "next";
import { Cormorant_Garamond, Geist_Mono } from "next/font/google";
import { CommerceProvider } from "@/lib/commerce/CommerceProvider";
import "./globals.css";

// vn.loccitane.com uses a proprietary licensed serif ("SVN-LOccitane Serif").
// Cormorant Garamond is the closest freely-licensed substitute: a refined,
// French-inspired display serif with matching proportions/weights.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "L'OCCITANE Việt Nam – Mỹ Phẩm thiên nhiên, cao cấp từ Pháp.",
  description:
    "L'Occitane là hãng mỹ phẩm được vinh danh nhờ nguyên liệu tự nhiên. Cung cấp các sản phẩm chăm sóc toàn diện da toàn diện từ body, da mặt, da đầu,...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${cormorant.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CommerceProvider>{children}</CommerceProvider>
      </body>
    </html>
  );
}
