import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import { Poppins } from "next/font/google";
import { SessionProvider } from "@/hooks/session-provider";
import { Toaster } from "@/components/ui/toaster";
import Breadcrumb from "@/components/ui/breadcrumb";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Gsports",
  description: "turf management system",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={`${poppins.className} antialiased`}>
          <Navbar />
          <div className="max-w-7xl sm:mx-auto mx-5 py-6">
          <Breadcrumb />
          </div>
          <div>{children}</div>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
