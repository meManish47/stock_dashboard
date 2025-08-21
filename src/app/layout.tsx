import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provide";
import HeaderComponent from "@/components/header/header";
export const metadata: Metadata = {
  title: "Stocks Stellar",
  description: "Place to view stocks and get latest updates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HeaderComponent />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
