import React from "react";
import "./../globals.css";
import Navbar from "@/components/ui/navbar";
import { SessionProvider } from "@/hooks/session-provider";
function HostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
    <html>
      <body>
          <Navbar />
        <div className="py-8 md:container flex flex-col mx-auto gap-8 lg:gap-16">
          {children}
        </div>
      </body>
    </html>
    </SessionProvider>
  );
}

export default HostLayout;
