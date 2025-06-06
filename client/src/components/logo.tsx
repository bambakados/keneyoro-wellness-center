import { Link } from "wouter";

export default function Logo() {
  return (
    <Link href="/">
      <a className="flex items-center space-x-3">
        <div className="relative">
          {/* African-inspired integrated wellness logo */}
          <svg width="40" height="40" viewBox="0 0 40 40" className="text-primary">
            {/* Outer circle representing unity and community */}
            <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-600"/>
            
            {/* Four interconnected circles representing the four services */}
            {/* Medical clinic - top */}
            <circle cx="20" cy="8" r="4" fill="currentColor" className="text-red-500" opacity="0.8"/>
            {/* Fitness center - right */}
            <circle cx="32" cy="20" r="4" fill="currentColor" className="text-blue-500" opacity="0.8"/>
            {/* Restaurant - bottom */}
            <circle cx="20" cy="32" r="4" fill="currentColor" className="text-green-500" opacity="0.8"/>
            {/* Store - left */}
            <circle cx="8" cy="20" r="4" fill="currentColor" className="text-purple-500" opacity="0.8"/>
            
            {/* Central hub representing unity */}
            <circle cx="20" cy="20" r="3" fill="currentColor" className="text-amber-700"/>
            
            {/* Connecting lines showing integration */}
            <line x1="20" y1="12" x2="20" y2="17" stroke="currentColor" strokeWidth="1.5" className="text-amber-600"/>
            <line x1="28" y1="20" x2="23" y2="20" stroke="currentColor" strokeWidth="1.5" className="text-amber-600"/>
            <line x1="20" y1="28" x2="20" y2="23" stroke="currentColor" strokeWidth="1.5" className="text-amber-600"/>
            <line x1="12" y1="20" x2="17" y2="20" stroke="currentColor" strokeWidth="1.5" className="text-amber-600"/>
            
            {/* African Adinkra-inspired pattern elements */}
            <path d="M15 15 L17 13 L19 15 L17 17 Z" fill="currentColor" className="text-amber-500" opacity="0.6"/>
            <path d="M25 15 L23 13 L21 15 L23 17 Z" fill="currentColor" className="text-amber-500" opacity="0.6"/>
            <path d="M15 25 L17 23 L19 25 L17 27 Z" fill="currentColor" className="text-amber-500" opacity="0.6"/>
            <path d="M25 25 L23 23 L21 25 L23 27 Z" fill="currentColor" className="text-amber-500" opacity="0.6"/>
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-neutral-800">KeneYoro</span>
          <span className="text-xs text-neutral-600 font-medium">Wellness Center</span>
        </div>
      </a>
    </Link>
  );
}
