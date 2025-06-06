import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Heart, 
  Users, 
  Calendar,
  Star,
  Leaf,
  Music,
  BookOpen,
  Utensils,
  Activity
} from "lucide-react";
import { Helmet } from "react-helmet";

export default function CulturalWellnessPrograms() {
  const [activeTab, setActiveTab] = useState("heritage-programs");

  // Heritage-based wellness programs
  const heritagePrograms = [
    {
      name: "Guinea Healing Traditions Workshop",
      culture: "West African (Guinea)",
      description: "Learn traditional healing practices from Guinea including herbal medicine, energy healing, and community wellness",
      duration: "4 weeks",
      frequency: "Weekly 2-hour sessions",
      participants: 15,
      maxCapacity: 20,
      instructor: "Elder Mamadou Diallo",
      credentials: "Traditional healer from Conakry, 40+ years experience",
      nextStart: "January 15, 2025",
      price: 180,
      includes: ["Herbal medicine kit", "Cultural healing handbook", "Community ceremony participation"]
    },
    {
      name: "Ayurvedic Lifestyle Integration",
      culture: "Indian Ayurveda",
      description: "Discover your dosha type and learn personalized nutrition, yoga, and daily routines for optimal health",
      duration: "6 weeks",
      frequency: "Bi-weekly 90-minute sessions",
      participants: 22,
      maxCapacity: 25,
      instructor: "Dr. Priya Sharma",
      credentials: "Certified Ayurvedic practitioner, 15 years experience",
      nextStart: "January 8, 2025",
      price: 240,
      includes: ["Dosha assessment", "Personalized meal plan", "Herbal tea blend"]
    },
    {
      name: "Traditional Chinese Medicine Basics",
      culture: "Chinese TCM",
      description: "Understanding qi energy, acupressure techniques, and seasonal wellness practices",
      duration: "5 weeks",
      frequency: "Weekly 2-hour sessions",
      participants: 18,
      maxCapacity: 20,
      instructor: "Dr. Wei Chen",
      credentials: "Licensed TCM practitioner, PhD in Traditional Medicine",
      nextStart: "February 1, 2025",
      price: 200,
      includes: ["Acupressure point guide", "Seasonal wellness calendar", "Qi assessment"]
    },
    {
      name: "Mediterranean Longevity Secrets",
      culture: "Mediterranean",
      description: "Blue Zone lifestyle principles, anti-inflammatory nutrition, and mindful living practices",
      duration: "3 weeks",
      frequency: "Weekly 2.5-hour sessions",
      participants: 28,
      maxCapacity: 30,
      instructor: "Chef Maria Gonzalez",
      credentials: "Nutritionist specializing in Mediterranean diet, registered dietitian",
      nextStart: "January 22, 2025",
      price: 150,
      includes: ["Recipe collection", "Olive oil tasting", "Meal planning guide"]
    }
  ];

  // Movement and dance programs
  const movementPrograms = [
    {
      name: "African Dance Healing Circle",
      origin: "Various African traditions",
      description: "Therapeutic movement combining traditional African dances for physical and emotional healing",
      schedule: "Mondays & Thursdays 6:00 PM",
      level: "All levels welcome",
      benefits: ["Cardiovascular health", "Stress relief", "Cultural connection", "Community building"],
      instructor: "Fatou Diallo",
      monthlyPrice: 80
    },
    {
      name: "Tai Chi in the Garden",
      origin: "Chinese martial arts",
      description: "Gentle flowing movements in our healing garden for balance, flexibility, and mental clarity",
      schedule: "Tuesday & Saturday 7:00 AM",
      level: "Beginner to intermediate",
      benefits: ["Balance improvement", "Stress reduction", "Joint mobility", "Mental focus"],
      instructor: "Master Liu Wei",
      monthlyPrice: 70
    },
    {
      name: "Bollywood Fitness Fusion",
      origin: "Indian classical and folk dance",
      description: "High-energy dance fitness combining traditional Indian movements with modern cardio",
      schedule: "Wednesdays 7:00 PM & Saturdays 10:00 AM",
      level: "All fitness levels",
      benefits: ["Cardio fitness", "Cultural appreciation", "Joy and expression", "Full-body workout"],
      instructor: "Priya Patel",
      monthlyPrice: 75
    },
    {
      name: "Native American-Inspired Movement",
      origin: "Indigenous wellness practices",
      description: "Earth-connected movement practices focusing on nature connection and spiritual wellness",
      schedule: "Fridays 5:30 PM",
      level: "All levels",
      benefits: ["Spiritual grounding", "Nature connection", "Mindful movement", "Emotional healing"],
      instructor: "Sarah Crow Feather",
      monthlyPrice: 65
    }
  ];

  // Nutrition and cooking programs
  const nutritionPrograms = [
    {
      name: "Global Superfoods Exploration",
      focus: "International superfoods",
      description: "Monthly exploration of superfoods from different cultures and their health benefits",
      format: "Hands-on cooking class + nutrition education",
      schedule: "First Saturday of each month, 2:00-5:00 PM",
      currentMonth: "Moringa and Baobab from West Africa",
      nextMonth: "Turmeric and Ashwagandha from India",
      price: 45,
      instructor: "Chef Aisha Koroma & Nutritionist Dr. Sarah Kim"
    },
    {
      name: "Healing Spices Workshop Series",
      focus: "Medicinal spice traditions",
      description: "Learn the therapeutic properties of spices from various cultures and how to use them daily",
      format: "Interactive workshop with take-home spice blends",
      schedule: "Second Sunday of each month, 1:00-4:00 PM",
      currentTopic: "Anti-inflammatory spices of the Mediterranean",
      nextTopic: "Digestive spices from Indian Ayurveda",
      price: 55,
      instructor: "Herbalist Maria Santos"
    },
    {
      name: "Fermented Foods Around the World",
      focus: "Traditional fermentation",
      description: "Discover gut-healthy fermented foods from global traditions and learn to make them",
      format: "Demonstration + hands-on practice",
      schedule: "Third Saturday of each month, 11:00 AM-2:00 PM",
      currentFeature: "Korean kimchi and Japanese miso",
      nextFeature: "African fermented grains and vegetables",
      price: 50,
      instructor: "Fermentation expert Dr. James Miller"
    }
  ];

  // Mind-body wellness programs
  const mindBodyPrograms = [
    {
      name: "Global Meditation Circle",
      traditions: ["Buddhist mindfulness", "Sufi whirling", "African drumming meditation", "Native American vision quests"],
      description: "Monthly rotating meditation practices from different spiritual traditions",
      schedule: "Every Sunday 9:00 AM",
      duration: "90 minutes",
      format: "Guided practice + cultural education",
      donation: "Suggested $15-25 donation",
      facilitator: "Interfaith wellness council"
    },
    {
      name: "Sound Healing Journey",
      instruments: ["Tibetan singing bowls", "African djembe", "Native American flutes", "Crystal bowls"],
      description: "Therapeutic sound experiences using traditional instruments from various cultures",
      schedule: "Second and fourth Friday 7:00 PM",
      duration: "75 minutes",
      benefits: ["Deep relaxation", "Stress relief", "Emotional release", "Spiritual connection"],
      price: 35,
      practitioner: "Sound healer Elena Rodriguez"
    },
    {
      name: "Breathwork Across Cultures",
      techniques: ["Pranayama (India)", "Holotropic breathwork", "Wim Hof method", "Traditional African breathing"],
      description: "Explore breathing techniques from different traditions for health and consciousness",
      schedule: "Monthly intensive workshops",
      duration: "3 hours",
      nextDate: "January 28, 2025",
      price: 75,
      guide: "Breathwork facilitator Michael Thompson"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Cultural Wellness Programs - KeneYoro Wellness Center</title>
        <meta name="description" content="Diverse cultural wellness programs at KeneYoro celebrating healing traditions from around the world including African, Asian, Mediterranean, and Indigenous practices." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌍 Cultural Wellness Programs
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore authentic healing traditions from cultures around the world. Each program honors 
            the original wisdom while making ancient practices accessible for modern wellness.
          </p>
        </div>

        {/* Program Categories Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Heritage Programs</CardTitle>
              <Globe className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{heritagePrograms.length}</div>
              <p className="text-xs text-green-600">Traditional healing systems</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Movement Arts</CardTitle>
              <Activity className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{movementPrograms.length}</div>
              <p className="text-xs text-blue-600">Cultural dance & movement</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nutrition Wisdom</CardTitle>
              <Utensils className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">{nutritionPrograms.length}</div>
              <p className="text-xs text-orange-600">Global food traditions</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mind-Body Arts</CardTitle>
              <Heart className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">{mindBodyPrograms.length}</div>
              <p className="text-xs text-purple-600">Meditation & consciousness</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="heritage-programs">Heritage Programs</TabsTrigger>
            <TabsTrigger value="movement-arts">Movement Arts</TabsTrigger>
            <TabsTrigger value="nutrition-wisdom">Nutrition Wisdom</TabsTrigger>
            <TabsTrigger value="mind-body">Mind-Body Arts</TabsTrigger>
          </TabsList>

          <TabsContent value="heritage-programs" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Traditional Healing Systems</h2>
              <p className="text-gray-600">Comprehensive programs teaching authentic healing traditions from master practitioners</p>
            </div>

            <div className="space-y-6">
              {heritagePrograms.map((program, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{program.name}</CardTitle>
                        <Badge variant="outline" className="mb-3">{program.culture}</Badge>
                        <p className="text-gray-700">{program.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-2xl font-bold text-green-600">${program.price}</p>
                        <p className="text-sm text-gray-600">{program.duration}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-sm text-gray-800">Instructor</p>
                          <p className="text-sm text-gray-700">{program.instructor}</p>
                          <p className="text-xs text-gray-600">{program.credentials}</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-sm text-gray-800">Schedule</p>
                          <p className="text-sm text-gray-700">{program.frequency}</p>
                          <p className="text-sm text-blue-600">Next start: {program.nextStart}</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-sm text-gray-800">Enrollment</p>
                          <div className="flex items-center gap-2">
                            <Progress value={(program.participants / program.maxCapacity) * 100} className="flex-1" />
                            <span className="text-sm text-gray-600">{program.participants}/{program.maxCapacity}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-sm text-gray-800">Program Includes:</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {program.includes.map((item, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button className="flex-1">Enroll Now</Button>
                          <Button variant="outline" className="flex-1">Learn More</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="movement-arts" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Cultural Movement & Dance</h2>
              <p className="text-gray-600">Therapeutic movement practices from diverse traditions for physical and emotional healing</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {movementPrograms.map((program, index) => (
                <Card key={index} className="border-l-4 border-l-purple-500">
                  <CardHeader>
                    <CardTitle className="text-lg">{program.name}</CardTitle>
                    <Badge variant="outline">{program.origin}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{program.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-800">Schedule</p>
                        <p className="text-gray-600">{program.schedule}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Level</p>
                        <p className="text-gray-600">{program.level}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm text-gray-800 mb-2">Benefits:</p>
                      <div className="flex flex-wrap gap-1">
                        {program.benefits.map((benefit, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="font-bold text-lg text-green-600">${program.monthlyPrice}/month</p>
                        <p className="text-xs text-gray-600">with {program.instructor}</p>
                      </div>
                      <Button>Join Class</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nutrition-wisdom" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Global Nutrition Traditions</h2>
              <p className="text-gray-600">Learn food as medicine practices from cultures around the world</p>
            </div>

            <div className="space-y-6">
              {nutritionPrograms.map((program, index) => (
                <Card key={index} className="border-l-4 border-l-orange-500">
                  <CardHeader>
                    <CardTitle className="text-lg">{program.name}</CardTitle>
                    <Badge variant="outline">{program.focus}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <p className="text-gray-700">{program.description}</p>
                        
                        <div>
                          <p className="font-medium text-sm text-gray-800">Format</p>
                          <p className="text-sm text-gray-600">{program.format}</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-sm text-gray-800">Schedule</p>
                          <p className="text-sm text-gray-600">{program.schedule}</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-sm text-gray-800">Instructor</p>
                          <p className="text-sm text-gray-600">{program.instructor}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="font-medium text-sm text-green-800">This Month</p>
                          <p className="text-sm text-green-700">{program.currentMonth || program.currentTopic || program.currentFeature}</p>
                        </div>
                        
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="font-medium text-sm text-blue-800">Next Month</p>
                          <p className="text-sm text-blue-700">{program.nextMonth || program.nextTopic || program.nextFeature}</p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <p className="font-bold text-lg text-green-600">${program.price}</p>
                          <Button>Register</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mind-body" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Mind-Body Spiritual Arts</h2>
              <p className="text-gray-600">Meditation, breathwork, and consciousness practices from diverse spiritual traditions</p>
            </div>

            <div className="space-y-6">
              {mindBodyPrograms.map((program, index) => (
                <Card key={index} className="border-l-4 border-l-purple-500">
                  <CardHeader>
                    <CardTitle className="text-lg">{program.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <p className="text-gray-700">{program.description}</p>
                        
                        <div>
                          <p className="font-medium text-sm text-gray-800">Schedule</p>
                          <p className="text-sm text-gray-600">{program.schedule}</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-sm text-gray-800">Duration</p>
                          <p className="text-sm text-gray-600">{program.duration}</p>
                        </div>
                        
                        {program.facilitator && (
                          <div>
                            <p className="font-medium text-sm text-gray-800">Facilitator</p>
                            <p className="text-sm text-gray-600">{program.facilitator}</p>
                          </div>
                        )}
                        
                        {program.practitioner && (
                          <div>
                            <p className="font-medium text-sm text-gray-800">Practitioner</p>
                            <p className="text-sm text-gray-600">{program.practitioner}</p>
                          </div>
                        )}
                        
                        {program.guide && (
                          <div>
                            <p className="font-medium text-sm text-gray-800">Guide</p>
                            <p className="text-sm text-gray-600">{program.guide}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-sm text-gray-800 mb-2">
                            {program.traditions ? "Traditions:" : program.instruments ? "Instruments:" : program.techniques ? "Techniques:" : "Benefits:"}
                          </p>
                          <div className="space-y-1">
                            {(program.traditions || program.instruments || program.techniques || program.benefits || []).map((item, i) => (
                              <Badge key={i} variant="outline" className="text-xs mr-1 mb-1">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {program.nextDate && (
                          <div className="p-3 bg-purple-50 rounded-lg">
                            <p className="font-medium text-sm text-purple-800">Next Session</p>
                            <p className="text-sm text-purple-700">{program.nextDate}</p>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between pt-2">
                          <p className="font-bold text-lg text-purple-600">
                            {program.donation || `$${program.price}`}
                          </p>
                          <Button>Join Session</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 bg-gradient-to-r from-green-50 to-purple-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🌟 Cultural Wellness Philosophy
          </h3>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">🙏</div>
              <p className="font-medium">Respectful Practice</p>
              <p className="text-gray-600">Honor original cultural contexts and meanings</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">👥</div>
              <p className="font-medium">Authentic Teachers</p>
              <p className="text-gray-600">Learn from practitioners within each tradition</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🌍</div>
              <p className="font-medium">Global Wisdom</p>
              <p className="text-gray-600">Celebrate healing knowledge from all cultures</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💫</div>
              <p className="font-medium">Modern Application</p>
              <p className="text-gray-600">Adapt ancient wisdom for contemporary wellness</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}