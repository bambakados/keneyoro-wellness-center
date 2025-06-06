import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Globe, Heart, Leaf } from "lucide-react";

export default function BusinessCard() {
  return (
    <div className="max-w-md mx-auto">
      <Card className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-teal-500 to-green-500 text-white shadow-xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 text-6xl">🌿</div>
          <div className="absolute top-8 right-6 text-4xl">🍃</div>
          <div className="absolute bottom-6 left-8 text-5xl">🌱</div>
          <div className="absolute bottom-4 right-4 text-3xl">🌍</div>
        </div>

        <CardContent className="relative p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart className="h-6 w-6 text-white" />
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-wide">KeneYoro</h1>
            <p className="text-sm opacity-90 font-medium">Integrated Wellness Center</p>
            <p className="text-xs opacity-80 italic">"Kene" (Health) + "Yoro" (Center) - Mandingo Heritage</p>
          </div>

          {/* Services */}
          <div className="border-t border-white/20 pt-4">
            <p className="text-xs text-center opacity-90 mb-3">Comprehensive Wellness Services</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-center">
                <div className="mb-1">🏥 Modern Clinic</div>
                <div className="mb-1">🧘‍♀️ Fitness Center</div>
              </div>
              <div className="text-center">
                <div className="mb-1">🥗 Healthy Dining</div>
                <div className="mb-1">🌿 Organic Store</div>
              </div>
            </div>
            <div className="text-center mt-2">
              <div className="text-xs">💻 Telehealth • 📊 Health Tracking • 🏆 Wellness Challenges</div>
            </div>
          </div>

          {/* Founder Info */}
          <div className="border-t border-white/20 pt-4 text-center">
            <h2 className="text-lg font-semibold">Ibrahim Bamba</h2>
            <p className="text-sm opacity-90">CEO & Founder</p>
            <p className="text-xs opacity-80">Bringing Guinea's Wellness Traditions to Modern Healthcare</p>
          </div>

          {/* Contact Information */}
          <div className="border-t border-white/20 pt-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span>(267) 401-3733</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span>ibamba@bambafamilyllc.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>10 Mill Street, Mount Holly, NJ 08060</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Globe className="h-4 w-4 flex-shrink-0" />
              <span>www.bambafamilyllc.com</span>
            </div>
          </div>

          {/* Company Info */}
          <div className="border-t border-white/20 pt-4 text-center">
            <p className="text-xs opacity-80">Bamba & Family LLC</p>
            <p className="text-xs opacity-70">Established 2014</p>
          </div>

          {/* Tagline */}
          <div className="text-center">
            <p className="text-sm font-medium italic opacity-95">
              "Where Ancient Wisdom Meets Modern Wellness"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}