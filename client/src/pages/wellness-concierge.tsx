import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Bot, 
  Heart, 
  AlertTriangle,
  Lightbulb,
  Globe,
  Calendar,
  TrendingUp,
  Leaf
} from "lucide-react";
import { Helmet } from "react-helmet";

export default function WellnessConcierge() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      message: "Welcome to your KeneYoro Wellness Concierge! I'm here to help you with health guidance combining modern science with traditional healing wisdom from around the world, including authentic Guinea practices. How can I assist your wellness journey today?",
      time: "Just now",
      category: "greeting"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  // Predictive health alerts based on user data
  const healthAlerts = [
    {
      id: 1,
      type: "stress",
      severity: "medium",
      title: "Elevated Stress Levels Detected",
      message: "Your heart rate variability suggests increased stress this week. Traditional Guinea remedy: Try our Hibiscus & Ginger tea meditation session.",
      suggestions: [
        "Book a 30-minute massage therapy session",
        "Join today's African meditation circle at 6 PM",
        "Order calming Kinkéliba tea from our restaurant"
      ],
      culturalWisdom: "In Guinea tradition, stress is balanced through community connection and herbal remedies."
    },
    {
      id: 2,
      type: "nutrition",
      severity: "low",
      title: "Hydration Reminder",
      message: "You're 20% below your daily water intake goal. In West African tradition, proper hydration supports all healing.",
      suggestions: [
        "Set hourly water reminders",
        "Try our Baobab electrolyte drink",
        "Visit our hydration station at the gym"
      ],
      culturalWisdom: "Baobab fruit has been used for centuries to maintain proper fluid balance."
    },
    {
      id: 3,
      type: "energy",
      severity: "high",
      title: "Energy Optimization Opportunity",
      message: "Your activity patterns show an energy dip at 3 PM daily. Traditional Guinea wisdom suggests natural energy boosting.",
      suggestions: [
        "Schedule a 15-minute African dance movement break",
        "Try our Moringa energy smoothie",
        "Book a brief acupuncture session"
      ],
      culturalWisdom: "Moringa is called 'the miracle tree' in Guinea for its natural energy-giving properties."
    }
  ];

  // Cultural wellness integration database
  const culturalWisdom = [
    {
      category: "Digestive Health",
      tradition: "Ginger & Honey Remedy",
      modernApplication: "Anti-inflammatory properties support gut health",
      availability: "Available fresh at our restaurant daily"
    },
    {
      category: "Immune Support",
      tradition: "Moringa Leaf Tea",
      modernApplication: "High in Vitamin C, antioxidants boost immune function",
      availability: "Premium grade supplements in our store"
    },
    {
      category: "Stress Relief",
      tradition: "Community Drum Circles",
      modernApplication: "Rhythmic movement reduces cortisol, builds social connection",
      availability: "Every Friday 7 PM in our wellness studio"
    },
    {
      category: "Sleep Quality",
      tradition: "Kinkéliba Evening Ritual",
      modernApplication: "Natural sedative properties promote restful sleep",
      availability: "Evening tea service at our café"
    }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      message: inputMessage,
      time: "Now",
      category: "question"
    };

    // Generate AI response based on input
    let botResponse = "";
    let category = "general";

    if (inputMessage.toLowerCase().includes("stress") || inputMessage.toLowerCase().includes("anxiety")) {
      botResponse = "I understand you're dealing with stress. In Guinea tradition, we say 'Kankan kelen tɛ se ka dɔn' - one person cannot be whole alone. Let me suggest some immediate stress relief options that combine traditional wisdom with modern wellness.";
      category = "stress-support";
    } else if (inputMessage.toLowerCase().includes("energy") || inputMessage.toLowerCase().includes("tired")) {
      botResponse = "Feeling low on energy? Traditional Guinea healers have used Moringa for centuries to restore vitality. I can recommend a personalized energy restoration plan combining our cultural remedies with modern nutrition science.";
      category = "energy-support";
    } else if (inputMessage.toLowerCase().includes("pain") || inputMessage.toLowerCase().includes("hurt")) {
      botResponse = "I'm sorry you're experiencing pain. Traditional Guinea healing combines movement therapy with herbal remedies. Let me connect you with our cultural wellness practitioners who can blend ancient wisdom with modern pain management.";
      category = "pain-support";
    } else {
      botResponse = "Thank you for sharing that with me. I'm here to provide guidance that honors both modern wellness science and our beautiful Guinea healing traditions. How can I help you integrate these approaches for your optimal health?";
      category = "general-support";
    }

    const aiMessage = {
      id: messages.length + 2,
      type: "bot",
      message: botResponse,
      time: "Now",
      category: category
    };

    setMessages([...messages, userMessage, aiMessage]);
    setInputMessage("");
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "border-red-500 bg-red-50";
      case "medium": return "border-yellow-500 bg-yellow-50";
      case "low": return "border-blue-500 bg-blue-50";
      default: return "border-gray-500 bg-gray-50";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case "medium": return <Heart className="h-5 w-5 text-yellow-600" />;
      case "low": return <Lightbulb className="h-5 w-5 text-blue-600" />;
      default: return <TrendingUp className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Wellness Concierge - KeneYoro Wellness Center</title>
        <meta name="description" content="24/7 AI-powered wellness guidance combining modern health science with traditional Guinea healing wisdom at KeneYoro." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🤖 AI Wellness Concierge
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your 24/7 health companion combining artificial intelligence with authentic Guinea healing wisdom. 
            Get personalized guidance, predictive health insights, and cultural wellness recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-600" />
                  Chat with Your Wellness Concierge
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about your wellness journey..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Health Alerts & Cultural Wisdom */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Predictive Health Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {healthAlerts.map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                    <div className="flex items-start gap-2 mb-2">
                      {getSeverityIcon(alert.severity)}
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{alert.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                      </div>
                    </div>
                    <div className="space-y-1 mb-2">
                      {alert.suggestions.map((suggestion, index) => (
                        <p key={index} className="text-xs text-gray-700">• {suggestion}</p>
                      ))}
                    </div>
                    <p className="text-xs text-blue-600 italic">{alert.culturalWisdom}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  Cultural Wisdom Database
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {culturalWisdom.map((wisdom, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-sm text-green-800">{wisdom.category}</h4>
                    <p className="text-xs text-gray-700 mt-1"><strong>Tradition:</strong> {wisdom.tradition}</p>
                    <p className="text-xs text-gray-700"><strong>Modern:</strong> {wisdom.modernApplication}</p>
                    <p className="text-xs text-green-600 mt-1">📍 {wisdom.availability}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button variant="outline" className="flex items-center gap-2 p-4 h-auto">
            <Calendar className="h-5 w-5 text-blue-600" />
            <div className="text-left">
              <p className="font-medium text-sm">Book Consultation</p>
              <p className="text-xs text-gray-600">Schedule with wellness experts</p>
            </div>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2 p-4 h-auto">
            <Leaf className="h-5 w-5 text-green-600" />
            <div className="text-left">
              <p className="font-medium text-sm">Traditional Remedies</p>
              <p className="text-xs text-gray-600">Explore Guinea healing wisdom</p>
            </div>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2 p-4 h-auto">
            <Heart className="h-5 w-5 text-red-600" />
            <div className="text-left">
              <p className="font-medium text-sm">Health Screening</p>
              <p className="text-xs text-gray-600">Comprehensive wellness check</p>
            </div>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2 p-4 h-auto">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <div className="text-left">
              <p className="font-medium text-sm">Progress Review</p>
              <p className="text-xs text-gray-600">Track your wellness journey</p>
            </div>
          </Button>
        </div>

        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🌍 Guinea Healing Wisdom Meets AI Innovation
          </h3>
          <p className="text-gray-700 mb-4">
            Our AI Wellness Concierge is trained on centuries of Guinea traditional healing knowledge, 
            combined with the latest health science research. Every recommendation honors your cultural 
            heritage while providing cutting-edge wellness guidance.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">🧠</div>
              <p className="font-medium">AI-Powered Insights</p>
              <p className="text-gray-600">Predictive health analytics</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🌿</div>
              <p className="font-medium">Traditional Wisdom</p>
              <p className="text-gray-600">Guinea healing knowledge</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">⚡</div>
              <p className="font-medium">24/7 Availability</p>
              <p className="text-gray-600">Always here to help</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}