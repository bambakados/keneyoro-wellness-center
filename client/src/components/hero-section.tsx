import { Link } from "wouter";
import { metricsData } from "@/lib/data";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-teal-500 to-green-500 text-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              🌍 KeneYoro - Your Wellness Journey
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-4">
              Where ancient Mandingo wellness wisdom meets modern healthcare - honoring Guinea's rich traditions of community health and healing.
            </p>
            <p className="text-base md:text-lg opacity-80 mb-8 italic">
              "Kene" (Health) + "Yoro" (Center) - Bringing authentic African wellness to your community
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/appointments">
                <a className="bg-white text-primary hover:bg-neutral-100 font-semibold py-3 px-6 rounded-lg transition shadow-lg text-center">
                  Book Appointment
                </a>
              </Link>
              <Link href="/services">
                <a className="bg-transparent hover:bg-white/10 border border-white text-white font-semibold py-3 px-6 rounded-lg transition text-center">
                  Explore Services
                </a>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            {/* Modern health facility image */}
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Integrated wellness center facility" 
              className="rounded-xl shadow-2xl max-w-full h-auto"
            />
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {metricsData.map((metric, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6">
              <div className="text-3xl md:text-4xl font-bold">{metric.value}</div>
              <div className="text-sm md:text-base mt-2 opacity-80">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
