import Logo from "./logo";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail, 
  Clock 
} from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const serviceLinks = [
    { label: "Medical Clinic", href: "/services/clinic" },
    { label: "Fitness Center", href: "/services/gym" },
    { label: "Healthy Restaurant", href: "/services/restaurant" },
    { label: "Organic Market", href: "/services/store" },
    { label: "Wellness Programs", href: "/services/wellness" },
    { label: "Membership Options", href: "/membership" }
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Careers", href: "/careers" },
    { label: "News & Blog", href: "/blog" },
    { label: "Partners", href: "/partners" },
    { label: "Contact Us", href: "/contact" }
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Accessibility", href: "/accessibility" }
  ];

  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
                <div className="text-primary text-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#2C7A7B" stroke="#2C7A7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </div>
              </div>
              <span className="text-xl font-bold">KeneYoro</span>
            </div>
            <p className="text-neutral-400 mb-4">
              Your complete wellness destination with integrated medical care, fitness, nutrition, and healthy products. Part of the trusted Bamba & Family LLC network of services.
            </p>
            <p className="text-neutral-500 text-sm mb-4">
              Proudly owned and operated by{" "}
              <a 
                href="https://www.bambafamilyllc.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors underline"
              >
                Bamba & Family LLC
              </a>
            </p>
            <p className="text-neutral-500 text-xs mb-6">
              Founded and led by CEO Ibrahim Bamba<br />
              <span className="text-neutral-600">Multi-service company providing Insurance (P&C, Life, Health), Transportation Services, and Notary Public services nationwide since 2014</span>
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <a className="text-neutral-400 hover:text-white transition">{link.label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <a className="text-neutral-400 hover:text-white transition">{link.label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mt-1 mr-3 text-neutral-400 flex-shrink-0" />
                <span className="text-neutral-400">
                  10 Mill Street<br />Mount Holly, NJ 08060
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-neutral-400 flex-shrink-0" />
                <span className="text-neutral-400">(267) 401-3733</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-neutral-400 flex-shrink-0" />
                <span className="text-neutral-400">ibamba@bambafamilyllc.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-neutral-400 flex-shrink-0" />
                <span className="text-neutral-400">Mon-Sun: 7AM - 9PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-700 text-center md:flex md:justify-between md:items-center">
          <p className="text-neutral-500 mb-4 md:mb-0">© {new Date().getFullYear()} KeneYoro by Bamba & Family LLC. All rights reserved.</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-2">
            {legalLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                <a className="text-neutral-500 hover:text-white text-sm transition">{link.label}</a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
