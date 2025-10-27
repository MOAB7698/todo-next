import "@styles/globals.css";
import Providers from "./providers";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import localFont from "next/font/local";

const iransans = localFont({
  src: [
    { path: "../../public/fonts/iransans/woff2/IRANSansXFaNum-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/iransans/woff2/IRANSansXFaNum-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-iransans",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={iransans.variable}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
