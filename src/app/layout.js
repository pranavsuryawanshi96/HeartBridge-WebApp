import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HeartSync",
  description: "HeartSync – sync your heart with moments",
   icons: {
    icon: [
      { url: "/heartsync_logo.svg", type: "image/svg+xml" },
      { url: "/heartsync_logo_32.png", sizes: "32x32", type: "image/png" },
      { url: "/heartsync_logo_192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/heartsync_logo_192.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
