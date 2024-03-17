import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import AuthProvider from "@/components/providers/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={cn("font-sans min-h-screen antialiased grainy")}>
        <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex flex-col bg-background">
            <Navbar />
            {/* <main className="flex-1 container relative bg-background shadow-md md:shadow-xl overflow-hidden rounded-[0.5rem]"> */}
            <main className="min-h-[calc(100vh-56px)]">
              {children}
            </main>
          </div>
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
