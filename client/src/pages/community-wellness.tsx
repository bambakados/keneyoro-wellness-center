import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Heart, 
  MessageCircle, 
  Video,
  Calendar,
  Star,
  Globe,
  UserPlus,
  Trophy,
  PlayCircle,
  CheckCircle
} from "lucide-react";
import { Helmet } from "react-helmet";

export default function CommunityWellness() {
  const [activeTab, setActiveTab] = useState("buddy-system");

  // Wellness buddy matching system
  const availableBuddies = [
    {
      id: 1,
      name: "Aminata Diallo",
      age: 32,
      location: "Mount Holly, NJ",
      goals: ["Weight Management", "Stress Reduction", "Cultural Wellness"],
      experience: "Intermediate",
      languages: ["English", "French", "Mandingo"],
      avatar: "👩🏾",
      compatibility: 95,
      story: "Looking for a wellness partner to explore traditional Guinea healing practices while achieving modern health goals.",
      achievements: ["30-Day Streak", "Cultural Explorer", "Nutrition Star"]
    },
    {
      id: 2,
      name: "Mohamed Koné",
      age: 28,
      location: "Philadelphia, PA",
      goals: ["Fitness Training", "Community Connection", "Traditional Healing"],
      experience: "Beginner",
      languages: ["English", "Mandingo", "Arabic"],
      avatar: "👨🏾",
      compatibility: 87,
      story: "New to wellness journey, excited to learn about African healing traditions and make lasting friendships.",
      achievements: ["First Steps", "Community Builder"]
    },
    {
      id: 3,
      name: "Fatou Kamara",
      age: 45,
      location: "Camden, NJ",
      goals: ["Diabetes Management", "Traditional Cooking", "Mindfulness"],
      experience: "Advanced",
      languages: ["English", "French", "Susu"],
      avatar: "👩🏿",
      compatibility: 92,
      story: "Experienced in combining traditional Guinea medicine with modern diabetes care. Love teaching others!",
      achievements: ["Health Mentor", "Cooking Master", "Wisdom Keeper"]
    }
  ];

  // Cultural wellness circles
  const wellnessCircles = [
    {
      id: 1,
      name: "Guinea Healing Traditions Circle",
      description: "Explore authentic healing practices from Guinea with modern applications",
      members: 24,
      leader: "Dr. Ibrahim Bamba",
      nextMeeting: "Dec 28, 7:00 PM",
      format: "In-person & Virtual",
      focus: "Traditional Medicine",
      activities: ["Herbal medicine workshops", "Healing ceremony discussions", "Modern integration techniques"],
      culturalElements: "Drumming, storytelling, plant medicine"
    },
    {
      id: 2,
      name: "African Dance Wellness Circle",
      description: "Movement therapy through traditional African dance forms",
      members: 18,
      leader: "Fatou Diallo",
      nextMeeting: "Dec 26, 6:30 PM",
      format: "In-person",
      focus: "Movement Therapy",
      activities: ["Traditional dance sessions", "Rhythm therapy", "Cultural expression"],
      culturalElements: "Live drumming, traditional costumes, community celebration"
    },
    {
      id: 3,
      name: "Mindful Nutrition Circle",
      description: "Combining traditional Guinea cuisine with modern nutritional science",
      members: 31,
      leader: "Chef Aisha Koroma",
      nextMeeting: "Dec 29, 5:00 PM",
      format: "Hybrid",
      focus: "Cultural Nutrition",
      activities: ["Cooking demonstrations", "Nutritional education", "Recipe sharing"],
      culturalElements: "Traditional ingredients, ancestral cooking methods, food as medicine"
    },
    {
      id: 4,
      name: "Wellness Mothers Circle",
      description: "Supporting mothers in their wellness journey with cultural wisdom",
      members: 16,
      leader: "Mama Khadija Touré",
      nextMeeting: "Dec 27, 4:00 PM",
      format: "In-person",
      focus: "Maternal Wellness",
      activities: ["Postpartum support", "Child wellness traditions", "Mother self-care"],
      culturalElements: "Traditional birthing wisdom, community support, intergenerational healing"
    }
  ];

  // Expert-led virtual sessions
  const virtualSessions = [
    {
      id: 1,
      title: "Traditional Guinea Herbal Medicine Workshop",
      instructor: "Dr. Mamadou Diallo - Traditional Healer from Conakry",
      date: "Dec 30, 2024",
      time: "2:00 PM EST",
      duration: "90 minutes",
      type: "Live Workshop",
      description: "Learn about medicinal plants used in Guinea for centuries and their modern applications",
      price: "Free for members",
      spots: "15 spots remaining",
      includes: ["Live Q&A", "Digital plant guide", "Recipe cards"]
    },
    {
      id: 2,
      title: "African Cooking for Diabetes Management",
      instructor: "Chef Aisha Koroma & Dr. Ibrahim Bamba",
      date: "Jan 2, 2025",
      time: "6:00 PM EST",
      duration: "120 minutes",
      type: "Cooking Class",
      description: "Discover how traditional African ingredients can support diabetes management",
      price: "$25 (includes ingredient kit)",
      spots: "8 spots remaining",
      includes: ["Ingredient kit delivery", "Recipe collection", "Nutritional guidance"]
    },
    {
      id: 3,
      title: "Stress Relief Through African Movement",
      instructor: "Fatou Diallo - Cultural Movement Therapist",
      date: "Jan 5, 2025",
      time: "7:00 PM EST",
      duration: "60 minutes",
      type: "Movement Session",
      description: "Experience traditional African movements designed to release stress and tension",
      price: "Free for members",
      spots: "Unlimited",
      includes: ["Movement guide", "Music playlist", "Stress management tips"]
    }
  ];

  const handleJoinBuddy = (buddyId: number) => {
    console.log("Requesting buddy partnership with:", buddyId);
  };

  const handleJoinCircle = (circleId: number) => {
    console.log("Joining wellness circle:", circleId);
  };

  const handleRegisterSession = (sessionId: number) => {
    console.log("Registering for virtual session:", sessionId);
  };

  return (
    <>
      <Helmet>
        <title>Community Wellness - KeneYoro Wellness Center</title>
        <meta name="description" content="Connect with wellness buddies, join cultural healing circles, and participate in expert-led sessions at KeneYoro's vibrant community." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🤝 Community Wellness
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with like-minded wellness enthusiasts, join cultural healing circles, 
            and learn from expert practitioners in our supportive community ecosystem.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="buddy-system">Wellness Buddies</TabsTrigger>
            <TabsTrigger value="cultural-circles">Cultural Circles</TabsTrigger>
            <TabsTrigger value="virtual-sessions">Expert Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="buddy-system" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Wellness Buddy</h2>
              <p className="text-gray-600">Connect with accountability partners who share your health goals and cultural interests</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableBuddies.map((buddy) => (
                <Card key={buddy.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{buddy.avatar}</div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{buddy.name}</CardTitle>
                        <p className="text-sm text-gray-600">{buddy.age} years • {buddy.location}</p>
                        <Badge variant="outline" className="mt-1 bg-green-50 text-green-700">
                          {buddy.compatibility}% Match
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-700">{buddy.story}</p>
                    
                    <div>
                      <p className="font-medium text-sm mb-2">Wellness Goals:</p>
                      <div className="flex flex-wrap gap-1">
                        {buddy.goals.map((goal, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-sm mb-2">Languages:</p>
                      <p className="text-sm text-gray-600">{buddy.languages.join(", ")}</p>
                    </div>

                    <div>
                      <p className="font-medium text-sm mb-2">Achievements:</p>
                      <div className="flex flex-wrap gap-1">
                        {buddy.achievements.map((achievement, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                            <Trophy className="h-3 w-3 mr-1" />
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleJoinBuddy(buddy.id)}
                      className="w-full flex items-center gap-2"
                    >
                      <UserPlus className="h-4 w-4" />
                      Connect as Wellness Buddy
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cultural-circles" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Cultural Wellness Circles</h2>
              <p className="text-gray-600">Join specialized groups focused on traditional African healing practices and modern wellness</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {wellnessCircles.map((circle) => (
                <Card key={circle.id} className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-green-600" />
                      {circle.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{circle.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Members</p>
                        <p className="text-gray-600 flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {circle.members} active
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Leader</p>
                        <p className="text-gray-600">{circle.leader}</p>
                      </div>
                      <div>
                        <p className="font-medium">Next Meeting</p>
                        <p className="text-gray-600 flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {circle.nextMeeting}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Format</p>
                        <p className="text-gray-600">{circle.format}</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-sm mb-2">Activities:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {circle.activities.map((activity, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-sm text-green-800 mb-1">Cultural Elements:</p>
                      <p className="text-sm text-green-700">{circle.culturalElements}</p>
                    </div>

                    <Button 
                      onClick={() => handleJoinCircle(circle.id)}
                      className="w-full flex items-center gap-2"
                    >
                      <Users className="h-4 w-4" />
                      Join Circle
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="virtual-sessions" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Expert-Led Virtual Sessions</h2>
              <p className="text-gray-600">Learn from traditional healers, master chefs, and wellness experts from Guinea and beyond</p>
            </div>

            <div className="space-y-6">
              {virtualSessions.map((session) => (
                <Card key={session.id} className="border-l-4 border-l-purple-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <Video className="h-5 w-5 text-purple-600" />
                          {session.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{session.instructor}</p>
                      </div>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700">
                        {session.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <p className="text-gray-700">{session.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium">Date & Time</p>
                            <p className="text-gray-600">{session.date}</p>
                            <p className="text-gray-600">{session.time}</p>
                          </div>
                          <div>
                            <p className="font-medium">Duration</p>
                            <p className="text-gray-600">{session.duration}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="font-medium text-green-600">{session.price}</span>
                          <span className="text-sm text-orange-600">{session.spots}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-sm mb-2">Session Includes:</p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {session.includes.map((item, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button 
                          onClick={() => handleRegisterSession(session.id)}
                          className="w-full flex items-center gap-2"
                        >
                          <PlayCircle className="h-4 w-4" />
                          Register Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 bg-gradient-to-r from-purple-50 to-green-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🌍 Building Bridges Between Tradition and Innovation
          </h3>
          <p className="text-gray-700 mb-4">
            Our community wellness programs create meaningful connections while honoring the rich healing 
            traditions of Guinea. Every interaction strengthens both individual wellness and cultural preservation.
          </p>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">🤝</div>
              <p className="font-medium">Accountability Partners</p>
              <p className="text-gray-600">Shared wellness goals</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🌿</div>
              <p className="font-medium">Cultural Circles</p>
              <p className="text-gray-600">Traditional healing wisdom</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">👨‍🏫</div>
              <p className="font-medium">Expert Guidance</p>
              <p className="text-gray-600">Master practitioners</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🌐</div>
              <p className="font-medium">Global Connection</p>
              <p className="text-gray-600">Worldwide community</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}