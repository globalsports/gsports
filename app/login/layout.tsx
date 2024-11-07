'use client'
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased bg-teal-50 bg-opacity-80`}
      >
        <div
          className="min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: "url('images/login-bg.jpg')",
          }}
        >
          <div className="sm:mx-auto mx-5">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
