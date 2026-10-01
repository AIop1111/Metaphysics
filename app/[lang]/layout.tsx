import { notFound } from "next/navigation";
import { HREFLANG, SITE_LOCALES, hexagramIndexPath, isSiteLocale } from "@/lib/site";
import "./reader.css";

// Server-rendered, crawlable pages with one URL per language (/zh/…, /en/…).
// The interactive app keeps its own root layout in app/(app).
export function generateStaticParams() { return SITE_LOCALES.map(lang => ({ lang })); }

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isSiteLocale(lang)) notFound();
  const zh = lang === "zh";
  return (
    <html lang={HREFLANG[lang]}>
      <head><link rel="icon" href="/favicon.svg" type="image/svg+xml" /></head>
      <body className="reader">
        <header className="reader-header">
          <a className="reader-brand" href={`/?lang=${lang}`}><strong>观象</strong><span>GUANXIANG</span></a>
          <nav aria-label={zh ? "主要导航" : "Main navigation"}>
            <a href={hexagramIndexPath(lang)}>{zh ? "六十四卦" : "64 Hexagrams"}</a>
            <a href={`/?lang=${lang}#library`}>{zh ? "星图书阁" : "Library"}</a>
            <a href={`/?lang=${lang}#journal`}>{zh ? "手记" : "Journal"}</a>
          </nav>
        </header>
        <main className="reader-main">{children}</main>
        <footer className="reader-footer">
          <span>{zh ? "观象 · 文化学习与个人反思。原文来自维基文库《周易》，导读为观象原创。" : "Guanxiang · cultural study and personal reflection. Classical text from the Zhou Yi on Wikisource; notes are original."}</span>
        </footer>
      </body>
    </html>
  );
}
