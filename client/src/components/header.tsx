import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  ShoppingBag, 
  Search, 
  User, 
  Menu as MenuIcon,
  X
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Logo from "./logo";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const { data: authData } = useQuery({
    queryKey: ['/api/auth/me'],
    queryFn: async () => {
      try {
        const res = await apiRequest('GET', '/api/auth/me');
        return res.json();
      } catch (error) {
        return { user: null };
      }
    }
  });

  const isAuthenticated = authData?.user;

  // Navigation links for desktop and mobile
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/appointments", label: "Clinic" },
    { href: "/telehealth", label: "Telehealth" },
    { href: "/classes", label: "Fitness" },
    { href: "/menu", label: "Restaurant" },
    { href: "/shop", label: "Store" },
    { href: "/wellness-dashboard", label: "Wellness Dashboard" },
    { href: "/smart-prescriptions", label: "Smart Prescriptions" },
    { href: "/wellness-concierge", label: "AI Concierge" },
    { href: "/community-wellness", label: "Community" },
    { href: "/iot-analytics", label: "IoT Analytics" },
    { href: "/global-wellness", label: "Global Wellness" },
    { href: "/cultural-wellness-programs", label: "Cultural Programs" },
    { href: "/business-management", label: "Business Dashboard" },
    { href: "/marketing-integration", label: "Marketing" },
    { href: "/admin-dashboard", label: "Admin Control" },
    { href: "/health-tracking", label: "Health Tracking" },
    { href: "/challenges", label: "Challenges" },
    { href: "/loyalty", label: "Rewards" }
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className={`text-neutral-600 hover:text-primary transition ${location === link.href ? 'text-primary font-medium' : ''}`}>
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/search">
              <a className="hidden md:block text-neutral-600 hover:text-primary transition">
                <Search className="h-5 w-5" />
              </a>
            </Link>
            
            <Link href="/cart">
              <a className="text-neutral-600 hover:text-primary transition">
                <ShoppingBag className="h-5 w-5" />
              </a>
            </Link>
            
            {isAuthenticated ? (
              <Link href="/profile">
                <a className="h-8 w-8 bg-neutral-200 rounded-full flex items-center justify-center cursor-pointer">
                  <User className="h-4 w-4 text-neutral-600" />
                </a>
              </Link>
            ) : (
              <Link href="/auth/login">
                <a className="h-8 w-8 bg-neutral-200 rounded-full flex items-center justify-center cursor-pointer">
                  <User className="h-4 w-4 text-neutral-600" />
                </a>
              </Link>
            )}
            
            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden text-neutral-600"
                >
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[75vw] md:w-[350px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <Logo />
                      <SheetClose asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-neutral-600"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                  <div className="py-6 px-4 flex-1">
                    <nav className="flex flex-col space-y-4">
                      {navLinks.map((link) => (
                        <Link key={link.href} href={link.href}>
                          <a 
                            className={`text-neutral-700 hover:text-primary px-2 py-2 rounded-md transition ${location === link.href ? 'bg-primary/5 text-primary font-medium' : ''}`}
                            onClick={() => setIsOpen(false)}
                          >
                            {link.label}
                          </a>
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="p-4 border-t">
                    {isAuthenticated ? (
                      <div className="flex flex-col space-y-2">
                        <Link href="/profile">
                          <a 
                            className="w-full bg-primary text-white text-center font-medium py-2 rounded-lg hover:bg-primary-dark transition"
                            onClick={() => setIsOpen(false)}
                          >
                            My Profile
                          </a>
                        </Link>
                        <Link href="/api/auth/logout">
                          <a 
                            className="w-full bg-gray-100 text-neutral-700 text-center font-medium py-2 rounded-lg hover:bg-gray-200 transition"
                            onClick={() => setIsOpen(false)}
                          >
                            Sign Out
                          </a>
                        </Link>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        <Link href="/auth/login">
                          <a 
                            className="w-full bg-primary text-white text-center font-medium py-2 rounded-lg hover:bg-primary-dark transition"
                            onClick={() => setIsOpen(false)}
                          >
                            Sign In
                          </a>
                        </Link>
                        <Link href="/auth/register">
                          <a 
                            className="w-full bg-gray-100 text-neutral-700 text-center font-medium py-2 rounded-lg hover:bg-gray-200 transition"
                            onClick={() => setIsOpen(false)}
                          >
                            Create Account
                          </a>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
