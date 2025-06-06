import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Heart, 
  Leaf, 
  Users,
  Star,
  Calendar
} from "lucide-react";
import { Helmet } from "react-helmet";

export default function GlobalWellness() {
  // Diverse cultural healing traditions from around the world
  const globalTraditions = [
    {
      culture: "West African (Guinea)",
      practice: "Moringa & Baobab Nutrition",
      description: "Ancient superfood wisdom for energy and vitality",
      modernBenefit: "High bioavailable nutrients, antioxidants",
      available: true,
      heritage: "Our founder Ibrahim Bamba's cultural roots"
    },
    {
      culture: "Traditional Chinese Medicine",
      practice: "Acupuncture & Herbal Therapy",
      description: "Energy flow balance through meridian points",
      modernBenefit: "Pain relief, stress reduction, improved circulation",
      available: true,
      heritage: "Practiced for over 3,000 years"
    },
    {
      culture: "Ayurvedic (India)",
      practice: "Dosha Balancing & Yoga",
      description: "Mind-body-spirit harmony through ancient practices",
      modernBenefit: "Reduced inflammation, better digestion, mental clarity",
      available: true,
      heritage: "5,000-year-old healing system"
    },
    {
      culture: "Mediterranean",
      practice: "Anti-Inflammatory Diet",
      description: "Olive oil, herbs, and whole foods for longevity",
      modernBenefit: "Heart health, brain function, disease prevention",
      available: true,
      heritage: "Blue Zone lifestyle wisdom"
    },
    {
      culture: "Native American",
      practice: "Sage Cleansing & Nature Connection",
      description: "Spiritual cleansing and earth-based healing",
      modernBenefit: "Stress relief, mindfulness, environmental wellness",
      available: true,
      heritage: "Indigenous wisdom traditions"
    },
    {
      culture: "Nordic",
      practice: "Sauna Therapy & Cold Exposure",
      description: "Heat and cold therapy for resilience",
      modernBenefit: "Improved circulation, immune function, mental toughness",
      available: true,
      heritage: "Scandinavian health traditions"
    }
  ];

  // Inclusive wellness programs
  const inclusivePrograms = [
    {
      name: "Global Healing Circle",
      description: "Explore healing traditions from different cultures",
      participants: "All backgrounds welcome",
      nextSession: "Dec 28, 7:00 PM",
      focus: "Cultural exchange and learning"
    },
    {
      name: "International Cuisine Wellness",
      description: "Healthy dishes from around the world",
      participants: "Food enthusiasts from all cultures",
      nextSession: "Dec 30, 6:00 PM",
      focus: "Nutritious global recipes"
    },
    {
      name: "Movement from Many Lands",
      description: "Dance and movement traditions worldwide",
      participants: "All fitness levels and backgrounds",
      nextSession: "Jan 2, 5:30 PM",
      focus: "Cultural dance and exercise"
    },
    {
      name: "Mindfulness Across Cultures",
      description: "Meditation practices from various traditions",
      participants: "Open to everyone",
      nextSession: "Jan 3, 8:00 AM",
      focus: "Global meditation techniques"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Global Wellness Traditions - KeneYoro Wellness Center</title>
        <meta name="description" content="Explore healing wisdom from cultures worldwide at KeneYoro. Everyone is welcome to discover diverse wellness practices from Guinea, Asia, Europe, and beyond." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌍 Global Wellness Traditions
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            KeneYoro celebrates healing wisdom from cultures around the world. Whether you're exploring 
            your own heritage or discovering new traditions, everyone is welcome on this wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-blue-600" />
                Our Inclusive Philosophy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Founded by Ibrahim Bamba with deep Guinea heritage, KeneYoro honors traditional 
                African healing wisdom while welcoming wellness practices from every culture.
              </p>
              <p className="text-gray-700">
                We believe that healing wisdom belongs to all humanity. Whether you're interested 
                in West African superfoods, Asian meditation, European spa traditions, or any other 
                cultural practice, you'll find a home here.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 font-medium">
                  "Wellness has no borders. Every culture has gifts to share." - Ibrahim Bamba, Founder
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-600" />
                Cultural Respect & Learning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We approach every tradition with deep respect and authentic representation. 
                Our practitioners are trained in their cultural contexts and work to honor 
                the original intentions of each practice.
              </p>
              <p className="text-gray-700">
                Whether you're connecting with your ancestral traditions or exploring new 
                cultures, we provide education about the history and significance of each practice.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800 font-medium">
                  All backgrounds welcome • Cultural education included • Respectful practice encouraged
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Healing Traditions from Around the World
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {globalTraditions.map((tradition, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{tradition.culture}</CardTitle>
                  <Badge variant="outline" className="w-fit">
                    {tradition.practice}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-700 text-sm">{tradition.description}</p>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-800 mb-1">Modern Benefits:</p>
                    <p className="text-xs text-gray-600">{tradition.modernBenefit}</p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs font-medium text-blue-800 mb-1">Cultural Heritage:</p>
                    <p className="text-xs text-blue-700">{tradition.heritage}</p>
                  </div>
                  
                  {tradition.available && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 w-full justify-center">
                      Available at KeneYoro
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Inclusive Wellness Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inclusivePrograms.map((program, index) => (
              <Card key={index} className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    {program.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-700">{program.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Welcome:</p>
                      <p className="text-gray-600">{program.participants}</p>
                    </div>
                    <div>
                      <p className="font-medium">Next Session:</p>
                      <p className="text-gray-600 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {program.nextSession}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <p className="text-xs text-purple-700">
                      <strong>Focus:</strong> {program.focus}
                    </p>
                  </div>
                  
                  <Button className="w-full">Join Program</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
            🤝 Everyone Belongs at KeneYoro
          </h3>
          <p className="text-gray-700 mb-6 text-center max-w-3xl mx-auto">
            Whether you're exploring your cultural roots, learning about new traditions, or simply 
            seeking the best wellness practices from around the world, KeneYoro welcomes you with open arms.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">🌍</div>
              <p className="font-medium">Global Traditions</p>
              <p className="text-sm text-gray-600">Healing wisdom from every continent</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🤝</div>
              <p className="font-medium">Cultural Respect</p>
              <p className="text-sm text-gray-600">Honoring origins and meanings</p>
            </div>
            <div>
              <div className="text-3xl mb-2">👥</div>
              <p className="font-medium">Inclusive Community</p>
              <p className="text-sm text-gray-600">All backgrounds welcomed</p>
            </div>
            <div>
              <div className="text-3xl mb-2">💫</div>
              <p className="font-medium">Personal Journey</p>
              <p className="text-sm text-gray-600">Find what works for you</p>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
              Explore Your Wellness Path
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}