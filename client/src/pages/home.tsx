import HeroSection from "@/components/hero-section";
import ServiceTabs from "@/components/service-tabs";
import WellnessDashboard from "@/components/wellness-dashboard";
import OurStory from "@/components/our-story";
import IntegrationSection from "@/components/integration-section";
import Testimonials from "@/components/testimonials";
import CTASection from "@/components/cta-section";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>KeneYoro - Integrated Wellness Center</title>
        <meta name="description" content="KeneYoro offers a complete wellness experience with integrated medical clinic, fitness center, healthy restaurant, and organic market services." />
        <meta property="og:title" content="KeneYoro - Integrated Wellness Center" />
        <meta property="og:description" content="Experience our integrated approach to health and wellness with medical care, fitness, nutrition, and organic products." />
        <meta property="og:type" content="website" />
      </Helmet>

      <HeroSection />
      
      {/* African Heritage Section */}
      <section className="py-16 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🌿 Rooted in African Wellness Traditions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              KeneYoro honors the rich healing traditions of Guinea and West Africa, where community wellness has been central to life for centuries.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-orange-50 rounded-xl border border-orange-200">
              <div className="text-4xl mb-4">🥭</div>
              <h3 className="text-xl font-semibold text-orange-800 mb-3">Traditional Nutrition</h3>
              <p className="text-gray-700">
                Our restaurant features authentic West African superfoods like cassava leaves, potato greens, and jollof rice - 
                traditional dishes that have nourished generations with natural healing properties.
              </p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Community Healing</h3>
              <p className="text-gray-700">
                Following Mandingo traditions of collective wellness, KeneYoro creates a supportive community 
                where health is achieved through shared knowledge, mutual support, and cultural connection.
              </p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Holistic Approach</h3>
              <p className="text-gray-700">
                Integrating body, mind, and spirit wellness practices rooted in African traditions with 
                modern medical care, chiropractic services, and evidence-based treatments.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center bg-gradient-to-r from-orange-100 to-green-100 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              From Guinea to Your Community 🇬🇳
            </h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Founded by Ibrahim Bamba, an American citizen with deep Mandingo roots in Guinea, 
              KeneYoro brings the wisdom of African wellness traditions to modern healthcare, 
              creating a bridge between ancestral knowledge and contemporary medicine.
            </p>
          </div>
        </div>
      </section>
      
      <ServiceTabs />
      <WellnessDashboard />
      <OurStory />
      <IntegrationSection />
      <Testimonials />
      <CTASection />
    </>
  );
}
