import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Dumbbell, 
  Utensils, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Star,
  Target,
  Calendar,
  MessageCircle
} from "lucide-react";
import { Helmet } from "react-helmet";

export default function WellnessDashboard() {
  const [activeGoal, setActiveGoal] = useState("weight-loss");

  // Smart recommendations based on user data
  const smartRecommendations = {
    meals: [
      {
        name: "Grilled Tilapia with Jollof Quinoa",
        reason: "High protein for muscle recovery after strength training",
        calories: 420,
        macros: "35g protein, 45g carbs, 12g fat",
        culture: "🌍 West African tradition meets modern nutrition"
      },
      {
        name: "Baobab Superfood Smoothie",
        reason: "Perfect post-workout recovery with natural electrolytes",
        calories: 280,
        macros: "20g protein, 35g carbs, 8g fat",
        culture: "🌳 Ancient superfruit with global wellness benefits"
      }
    ],
    workouts: [
      {
        name: "Cultural Dance Cardio",
        reason: "Based on your preference for diverse cultural fitness",
        duration: "45 min",
        calories: 350,
        instructor: "Fatou Diallo"
      },
      {
        name: "Functional Strength Training",
        reason: "Complements your wellness goals perfectly",
        duration: "30 min", 
        calories: 280,
        instructor: "Ibrahim Bamba"
      }
    ],
    products: [
      {
        name: "Moringa Leaf Powder",
        reason: "Supports energy levels based on your health tracking",
        price: 24.99,
        benefits: "Iron, Vitamin C, Antioxidants"
      },
      {
        name: "African Black Soap Set",
        reason: "Natural wellness for your skin health journey",
        price: 18.99,
        benefits: "Gentle cleansing, Anti-inflammatory"
      }
    ]
  };

  const wellnessStats = {
    clinic: { visits: 3, nextAppointment: "Dec 28, 2024", lastCheckup: "Excellent" },
    gym: { visits: 12, streak: 4, favoriteClass: "African Dance Cardio" },
    nutrition: { healthyMeals: 18, calorieGoal: 85, waterIntake: 92 },
    store: { purchases: 6, savedMoney: 45, loyaltyPoints: 1250 }
  };

  const communityUpdates = [
    {
      user: "Aminata K.",
      message: "Just completed my first month of African Dance Cardio! Feeling amazing! 💃🏾",
      likes: 23,
      time: "2 hours ago"
    },
    {
      user: "Mohamed S.",
      message: "The Jollof Quinoa Bowl is incredible! Who knew healthy could taste this good? 🍽️",
      likes: 17,
      time: "5 hours ago"
    },
    {
      user: "Dr. Kaba",
      message: "Remember: small consistent steps lead to big wellness transformations! 🌱",
      likes: 45,
      time: "1 day ago"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Wellness Dashboard - KeneYoro Integrated Wellness Center</title>
        <meta name="description" content="Your personalized wellness journey dashboard combining clinic care, fitness, nutrition, and community support at KeneYoro." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌿 Your Wellness Journey
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover your personalized path to holistic wellness with recommendations 
            tailored to your unique journey, incorporating healing wisdom from diverse cultures worldwide.
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="recommendations">Smart Suggestions</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clinic Care</CardTitle>
                  <Heart className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-800">{wellnessStats.clinic.visits}</div>
                  <p className="text-xs text-blue-600">visits this quarter</p>
                  <p className="text-xs text-gray-600 mt-2">Next: {wellnessStats.clinic.nextAppointment}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Fitness</CardTitle>
                  <Dumbbell className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800">{wellnessStats.gym.visits}</div>
                  <p className="text-xs text-green-600">gym sessions this month</p>
                  <p className="text-xs text-gray-600 mt-2">{wellnessStats.gym.streak} day streak! 🔥</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Nutrition</CardTitle>
                  <Utensils className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-800">{wellnessStats.nutrition.healthyMeals}</div>
                  <p className="text-xs text-orange-600">healthy meals enjoyed</p>
                  <Progress value={wellnessStats.nutrition.calorieGoal} className="mt-2 h-2" />
                  <p className="text-xs text-gray-600 mt-1">{wellnessStats.nutrition.calorieGoal}% calorie goal</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Store</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-800">{wellnessStats.store.loyaltyPoints}</div>
                  <p className="text-xs text-purple-600">loyalty points earned</p>
                  <p className="text-xs text-gray-600 mt-2">Saved ${wellnessStats.store.savedMoney} this month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Your Wellness Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Weight Management</span>
                      <Badge variant="outline">78% complete</Badge>
                    </div>
                    <Progress value={78} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Cardiovascular Health</span>
                      <Badge variant="outline">92% complete</Badge>
                    </div>
                    <Progress value={92} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Stress Management</span>
                      <Badge variant="outline">65% complete</Badge>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Heart className="h-4 w-4 text-blue-600" />
                    <div className="text-sm">
                      <p className="font-medium">Health Checkup</p>
                      <p className="text-gray-600">Dec 28, 2:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Dumbbell className="h-4 w-4 text-green-600" />
                    <div className="text-sm">
                      <p className="font-medium">African Dance Class</p>
                      <p className="text-gray-600">Today, 6:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <Utensils className="h-4 w-4 text-orange-600" />
                    <div className="text-sm">
                      <p className="font-medium">Nutrition Workshop</p>
                      <p className="text-gray-600">Dec 26, 4:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Smart Recommendations</h2>
              <p className="text-gray-600">Personalized suggestions based on your wellness journey</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-orange-600" />
                    Recommended Meals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {smartRecommendations.meals.map((meal, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-2">
                      <h3 className="font-semibold text-gray-900">{meal.name}</h3>
                      <p className="text-sm text-gray-600">{meal.reason}</p>
                      <p className="text-sm font-medium text-orange-600">{meal.calories} calories</p>
                      <p className="text-xs text-gray-500">{meal.macros}</p>
                      <p className="text-xs text-blue-600">{meal.culture}</p>
                      <Button size="sm" className="w-full">Order Now</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="h-5 w-5 text-green-600" />
                    Suggested Workouts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {smartRecommendations.workouts.map((workout, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-2">
                      <h3 className="font-semibold text-gray-900">{workout.name}</h3>
                      <p className="text-sm text-gray-600">{workout.reason}</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">{workout.duration}</span>
                        <span className="text-gray-500">{workout.calories} cal</span>
                      </div>
                      <p className="text-xs text-gray-500">with {workout.instructor}</p>
                      <Button size="sm" className="w-full">Book Class</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-purple-600" />
                    Wellness Products
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {smartRecommendations.products.map((product, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-2">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.reason}</p>
                      <p className="text-sm font-medium text-purple-600">${product.price}</p>
                      <p className="text-xs text-gray-500">{product.benefits}</p>
                      <Button size="sm" className="w-full">Add to Cart</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Progress Journey</h2>
              <p className="text-gray-600">Track your holistic wellness transformation</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Overall Wellness Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-6xl font-bold text-green-600">82</div>
                    <p className="text-gray-600">Excellent progress! You're on the right track.</p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">92</div>
                        <p className="text-xs text-gray-600">Fitness</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">78</div>
                        <p className="text-xs text-gray-600">Nutrition</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">85</div>
                        <p className="text-xs text-gray-600">Mental Health</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">74</div>
                        <p className="text-xs text-gray-600">Sleep Quality</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievement Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl mb-2">🏃‍♀️</div>
                      <p className="font-medium text-sm">Fitness Warrior</p>
                      <p className="text-xs text-gray-600">10 gym sessions</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl mb-2">🥗</div>
                      <p className="font-medium text-sm">Nutrition Star</p>
                      <p className="text-xs text-gray-600">15 healthy meals</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl mb-2">🏥</div>
                      <p className="font-medium text-sm">Health Champion</p>
                      <p className="text-xs text-gray-600">Regular checkups</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl mb-2">🌱</div>
                      <p className="font-medium text-sm">Wellness Explorer</p>
                      <p className="text-xs text-gray-600">Try new services</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Wellness Community</h2>
              <p className="text-gray-600">Connect and share your journey with fellow wellness enthusiasts</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Community Updates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {communityUpdates.map((update, index) => (
                    <div key={index} className="p-4 border-l-4 border-blue-200 bg-gray-50 rounded-r-lg">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="font-medium text-sm text-gray-900">{update.user}</p>
                          <p className="text-gray-700">{update.message}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              {update.likes} likes
                            </span>
                            <span>{update.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full">Share Your Progress</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Community Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">847</div>
                    <p className="text-sm text-gray-600">Active Members</p>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">1,230</div>
                    <p className="text-sm text-gray-600">Wellness Goals Achieved</p>
                  </div>
                  
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-3xl font-bold text-orange-600">95%</div>
                    <p className="text-sm text-gray-600">Member Satisfaction</p>
                  </div>

                  <Button variant="outline" className="w-full">Join Discussion</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}