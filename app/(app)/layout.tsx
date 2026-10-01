import type { Metadata } from "next";
import "../globals.css";
import "../minimal-ui.css";

export const metadata: Metadata = {
  title: "观象 · Guanxiang | 六十四卦、星座、MBTI 与星图书阁",
  description: "浏览完整六十四卦原文与原创导读，阅读十二星座每日灵感，探索 MBTI 偏好。通过入门路径、术语和精选资料理解结果，在个人手记中记录与复盘。Explore all 64 I Ching patterns, zodiac prompts, personality preferences, learning paths, and your personal journal.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hans">
      <body className="antialiased">{children}</body>
    </html>
  );
}
