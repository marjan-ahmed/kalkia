import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Exo_2, Lexend } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-exo2",
  display: "swap",
})

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-lexend",
  display: "swap",
})



export const metadata: Metadata = {
  title: "Kalkia - Weather Probability Checker",
  description: "AI-powered weather forecasting and probability analysis using NASA Power (MERRA-2) data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
          async
        ></script>
      </head>
      <body
        className={`${exo2.variable} ${lexend.variable} antialiased `}
      >
      <div className="flex flex-col min-h-screen">
      <header>
        <Header />
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
      </body>
    </html>
  );
}
