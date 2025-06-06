import { ReactNode } from "react";
import Header from "../header";
import Footer from "../footer";
import { Toaster } from "@/components/ui/toaster";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen" style={{
      background: 'linear-gradient(135deg, #D2691E 0%, #DEB887 20%, #228B22 40%, #9ACD32 55%, #FF8C00 75%, #CD853F 90%, #8B4513 100%)',
      backgroundAttachment: 'fixed'
    }}>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
