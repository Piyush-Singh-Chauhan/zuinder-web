import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/component/Header/header";
import Footer from "@/component/Footer/footer";
import { LanguageProvider } from "@/i18n/LanguageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zuinder",
  description: "Inovando Pelo Mundo",
  icons: {
    icon: "/assets/img/logo/logo.jpeg", 
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <Header/>
          {children}
          <Footer/>
        </LanguageProvider>
      </body>
    </html>
  );
}
