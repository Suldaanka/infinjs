import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/Providers";





const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hobyo Iftin Hotel",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  description: "Iftin Hotel is a luxurious hotel located in the heart of the city, offering top-notch amenities and services for a comfortable stay.",
  keywords: "hobyo, somalia, galmudug, iftin hotel",
};

export default function RootLayout({ children }) {
  return (
    <html 
       lang="en"
       suppressHydrationWarning
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ClientProviders>
            {children}
          </ClientProviders>
      </body>
    </html>
  );
}
