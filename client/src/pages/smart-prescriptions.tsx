import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Stethoscope, 
  UtensilsCrossed, 
  Pill, 
  Dumbbell,
  CheckCircle,
  Clock,
  ShoppingCart,
  Calendar
} from "lucide-react";
import { Helmet } from "react-helmet";

export default function SmartPrescriptions() {
  const [activeTab, setActiveTab] = useState("meal-prescriptions");

  // Smart health prescriptions from clinic
  const healthPrescriptions = {
    meals: [
      {
        id: 1,
        prescribedBy: "Dr. Aminata Kone",
        condition: "High Blood Pressure Management",
        date: "Dec 24, 2024",
        meals: [
          {
            name: "Low-Sodium Jollof with Grilled Fish",
            reason: "Rich in potassium, low sodium for blood pressure control",
            frequency: "3x per week",
            culturalBenefit: "Traditional Guinea preparation with health modifications",
            available: true,
            price: 18.99
          },
          {
            name: "Hibiscus Tea with Ginger",
            reason: "Natural ACE inhibitor properties, traditional hypertension remedy",
            frequency: "Daily with breakfast",
            culturalBenefit: "Ancient West African cardiovascular support",
            available: true,
            price: 6.99
          }
        ]
      },
      {
        id: 2,
        prescribedBy: "Dr. Ibrahim Bamba",
        condition: "Post-Workout Recovery",
        date: "Dec 23, 2024",
        meals: [
          {
            name: "Baobab Protein Recovery Bowl",
            reason: "High protein, natural electrolytes, anti-inflammatory compounds",
            frequency: "Post-workout within 30 minutes",
            culturalBenefit: "Baobab - the tree of life, traditional strength food",
            available: true,
            price: 16.99
          }
        ]
      }
    ],
    supplements: [
      {
        id: 1,
        prescribedBy: "Dr. Aminata Kone",
        condition: "Iron Deficiency Anemia",
        date: "Dec 22, 2024",
        supplements: [
          {
            name: "Moringa Leaf Extract - Premium Grade",
            dosage: "2 capsules daily with meals",
            reason: "High bioavailable iron, Vitamin C enhances absorption",
            culturalBenefit: "Moringa - miracle tree of Guinea, traditional blood builder",
            duration: "3 months",
            available: true,
            price: 34.99
          },
          {
            name: "African Potato Complex",
            dosage: "1 tablet daily",
            reason: "Supports immune system and energy levels",
            culturalBenefit: "Traditional African root medicine for vitality",
            duration: "2 months",
            available: true,
            price: 28.99
          }
        ]
      }
    ],
    exercises: [
      {
        id: 1,
        prescribedBy: "Dr. Ibrahim Bamba",
        condition: "Lower Back Pain Management",
        date: "Dec 24, 2024",
        exercises: [
          {
            name: "African Dance Therapy Sessions",
            frequency: "2x per week, 45 minutes",
            reason: "Low-impact movement, core strengthening, cultural healing",
            culturalBenefit: "Traditional Guinea healing through rhythmic movement",
            instructor: "Fatou Diallo",
            nextSession: "Dec 26, 6:00 PM",
            bookingAvailable: true
          },
          {
            name: "Gentle Yoga Flow",
            frequency: "Daily, 20 minutes",
            reason: "Flexibility, pain relief, stress reduction",
            culturalBenefit: "Mindfulness practices integrated with African meditation",
            instructor: "Aisha Koroma",
            nextSession: "Dec 25, 7:00 AM",
            bookingAvailable: true
          }
        ]
      }
    ]
  };

  const handleOrderMeal = (meal: any) => {
    console.log("Ordering prescribed meal:", meal.name);
    // Integration with restaurant ordering system
  };

  const handleOrderSupplement = (supplement: any) => {
    console.log("Adding prescribed supplement to cart:", supplement.name);
    // Integration with store system
  };

  const handleBookExercise = (exercise: any) => {
    console.log("Booking prescribed exercise:", exercise.name);
    // Integration with fitness booking system
  };

  return (
    <>
      <Helmet>
        <title>Smart Health Prescriptions - KeneYoro Wellness Center</title>
        <meta name="description" content="AI-powered health prescriptions integrating clinic care with personalized meals, supplements, and exercise therapy at KeneYoro." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎯 Smart Health Prescriptions
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Revolutionary integration connecting your clinic visits directly to personalized 
            meals, supplements, and exercise therapy - all rooted in authentic Guinea wellness traditions.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="meal-prescriptions">Meal Prescriptions</TabsTrigger>
            <TabsTrigger value="supplement-prescriptions">Supplement Prescriptions</TabsTrigger>
            <TabsTrigger value="exercise-prescriptions">Exercise Therapy</TabsTrigger>
          </TabsList>

          <TabsContent value="meal-prescriptions" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Prescribed Meals</h2>
              <p className="text-gray-600">Personalized nutrition therapy from your healthcare providers</p>
            </div>

            {healthPrescriptions.meals.map((prescription) => (
              <Card key={prescription.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Stethoscope className="h-5 w-5 text-blue-600" />
                        Prescribed by {prescription.prescribedBy}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        For: {prescription.condition} • {prescription.date}
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      Active Prescription
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {prescription.meals.map((meal, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">{meal.name}</h3>
                            <p className="text-sm text-gray-700 mb-2">{meal.reason}</p>
                            <p className="text-sm text-blue-600 mb-2 italic">{meal.culturalBenefit}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-gray-500" />
                                {meal.frequency}
                              </span>
                              <span className="font-medium text-green-600">${meal.price}</span>
                              {meal.available && (
                                <Badge variant="outline" className="bg-green-50 text-green-700">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Available Now
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button 
                            onClick={() => handleOrderMeal(meal)}
                            className="flex items-center gap-2 ml-4"
                          >
                            <UtensilsCrossed className="h-4 w-4" />
                            Order Now
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="supplement-prescriptions" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Prescribed Supplements</h2>
              <p className="text-gray-600">Traditional African botanicals and modern supplements prescribed by your doctors</p>
            </div>

            {healthPrescriptions.supplements.map((prescription) => (
              <Card key={prescription.id} className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Pill className="h-5 w-5 text-green-600" />
                        Prescribed by {prescription.prescribedBy}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        For: {prescription.condition} • {prescription.date}
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Priority Order
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {prescription.supplements.map((supplement, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">{supplement.name}</h3>
                            <p className="text-sm text-gray-700 mb-2">{supplement.reason}</p>
                            <p className="text-sm text-green-600 mb-2 italic">{supplement.culturalBenefit}</p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <span><strong>Dosage:</strong> {supplement.dosage}</span>
                              <span><strong>Duration:</strong> {supplement.duration}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm mt-2">
                              <span className="font-medium text-green-600">${supplement.price}</span>
                              {supplement.available && (
                                <Badge variant="outline" className="bg-green-50 text-green-700">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  In Stock
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button 
                            onClick={() => handleOrderSupplement(supplement)}
                            className="flex items-center gap-2 ml-4"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="exercise-prescriptions" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Exercise Therapy Prescriptions</h2>
              <p className="text-gray-600">Therapeutic movement and cultural healing practices prescribed by your healthcare team</p>
            </div>

            {healthPrescriptions.exercises.map((prescription) => (
              <Card key={prescription.id} className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Dumbbell className="h-5 w-5 text-purple-600" />
                        Prescribed by {prescription.prescribedBy}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        For: {prescription.condition} • {prescription.date}
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                      Therapy Plan
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {prescription.exercises.map((exercise, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">{exercise.name}</h3>
                            <p className="text-sm text-gray-700 mb-2">{exercise.reason}</p>
                            <p className="text-sm text-purple-600 mb-2 italic">{exercise.culturalBenefit}</p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <span><strong>Frequency:</strong> {exercise.frequency}</span>
                              <span><strong>Instructor:</strong> {exercise.instructor}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm mt-2">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                Next: {exercise.nextSession}
                              </span>
                              {exercise.bookingAvailable && (
                                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Booking Available
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button 
                            onClick={() => handleBookExercise(exercise)}
                            className="flex items-center gap-2 ml-4"
                          >
                            <Calendar className="h-4 w-4" />
                            Book Session
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🌍 Cultural Wellness Integration
          </h3>
          <p className="text-gray-700 mb-4">
            Every prescription combines modern medical science with authentic Guinea healing traditions, 
            ensuring your wellness journey honors both cutting-edge healthcare and ancestral wisdom.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">🌳</div>
              <p className="font-medium">Traditional Botanicals</p>
              <p className="text-gray-600">Moringa, Baobab, African Potato</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🥁</div>
              <p className="font-medium">Cultural Movement</p>
              <p className="text-gray-600">African Dance Therapy</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🍽️</div>
              <p className="font-medium">Heritage Cuisine</p>
              <p className="text-gray-600">Modified traditional recipes</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}