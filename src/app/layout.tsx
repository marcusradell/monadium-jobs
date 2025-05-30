import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Monadium Jobs",
  description: "Keep track of your dream jobs",
};

function Navbar() {
  return (
    <div className="navbar bg-primary text-primary-content">
      <button className="btn btn-ghost text-xl">Monadium Jobs</button>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="coffee">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased prose`}
      >
        <div className="w-screen">
          <Navbar />
          <main className="container mt-4 mx-auto px-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
