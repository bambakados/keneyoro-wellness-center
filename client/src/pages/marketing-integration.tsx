import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  Mail, 
  MessageSquare, 
  Share2,
  TrendingUp,
  Users,
  Calendar,
  Megaphone,
  Heart,
  Star
} from "lucide-react";
import { Helmet } from "react-helmet";

export default function MarketingIntegration() {
  const [activeTab, setActiveTab] = useState("campaigns");

  // Marketing campaign data
  const activeCampaigns = [
    {
      name: "New Year Wellness Challenge",
      type: "Email + Social Media",
      audience: "Health Enthusiasts",
      reach: 2847,
      engagement: 18.5,
      conversions: 127,
      budget: 850,
      status: "active",
      endsIn: "5 days"
    },
    {
      name: "Guinea Heritage Month Special",
      type: "Cultural Awareness",
      audience: "African Diaspora Community",
      reach: 1634,
      engagement: 24.3,
      conversions: 89,
      budget: 620,
      status: "active",
      endsIn: "12 days"
    },
    {
      name: "Stress Relief Workshop Series",
      type: "Educational Content",
      audience: "Working Professionals",
      reach: 3256,
      engagement: 16.8,
      conversions: 156,
      budget: 950,
      status: "active",
      endsIn: "8 days"
    }
  ];

  // Social media performance
  const socialMediaStats = {
    instagram: {
      followers: 4823,
      monthlyGrowth: 12.5,
      engagement: 8.7,
      topPost: "African Dance Fitness Class highlight reel"
    },
    facebook: {
      followers: 3567,
      monthlyGrowth: 8.3,
      engagement: 6.2,
      topPost: "Traditional Guinea healing herbs guide"
    },
    linkedin: {
      followers: 1892,
      monthlyGrowth: 15.7,
      engagement: 4.9,
      topPost: "Workplace wellness program announcement"
    },
    tiktok: {
      followers: 2156,
      monthlyGrowth: 28.4,
      engagement: 12.3,
      topPost: "30-second moringa smoothie recipe"
    }
  };

  // Email marketing performance
  const emailStats = {
    subscribers: 6742,
    openRate: 28.5,
    clickRate: 7.3,
    unsubscribeRate: 1.2,
    lastCampaign: "Weekly Wellness Tips #47",
    topPerformingSubject: "Ancient Guinea remedy for better sleep"
  };

  // Content ideas
  const contentIdeas = [
    {
      title: "Traditional African Superfoods Series",
      type: "Educational Blog + Video",
      target: "Health-conscious consumers",
      culturalFocus: "West African nutrition wisdom",
      estimatedReach: "5K-8K people",
      effort: "Medium"
    },
    {
      title: "Workplace Wellness Partnership Program",
      type: "B2B Outreach Campaign",
      target: "Local businesses",
      culturalFocus: "Global wellness approaches",
      estimatedReach: "50-100 companies",
      effort: "High"
    },
    {
      title: "Community Health Heroes Spotlight",
      type: "Social Media Stories",
      target: "Local community members",
      culturalFocus: "Diverse cultural backgrounds",
      estimatedReach: "2K-4K people",
      effort: "Low"
    },
    {
      title: "Virtual Cooking Class Series",
      type: "Live Stream Events",
      target: "Families and food enthusiasts",
      culturalFocus: "Traditional recipes with modern nutrition",
      estimatedReach: "1K-3K people",
      effort: "Medium"
    }
  ];

  // Customer testimonials for marketing
  const testimonials = [
    {
      name: "Sarah Mitchell",
      background: "Working mother of two",
      quote: "KeneYoro transformed my approach to wellness. The combination of traditional healing and modern medicine is incredible.",
      services: "Clinic + Nutrition counseling",
      rating: 5,
      photo: "👩🏻"
    },
    {
      name: "Carlos Rodriguez",
      background: "Fitness enthusiast",
      quote: "The African dance classes are amazing! I've never felt stronger or more connected to my workout routine.",
      services: "Gym membership + Cultural fitness",
      rating: 5,
      photo: "👨🏽"
    },
    {
      name: "Dr. Jennifer Kim",
      background: "Healthcare professional",
      quote: "As a doctor, I appreciate how KeneYoro integrates evidence-based medicine with cultural healing practices.",
      services: "Professional wellness consultation",
      rating: 5,
      photo: "👩🏻‍⚕️"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-50 text-green-700 border-green-200";
      case "paused": return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "completed": return "bg-blue-50 text-blue-700 border-blue-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <>
      <Helmet>
        <title>Marketing Integration - KeneYoro Wellness Center</title>
        <meta name="description" content="Comprehensive marketing dashboard for KeneYoro wellness center including social media management, email campaigns, and audience engagement analytics." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📢 Marketing Integration
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Reach your audience with culturally-aware marketing campaigns that celebrate wellness diversity 
            while building your KeneYoro community across all channels.
          </p>
        </div>

        {/* Marketing Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">7,737</div>
              <p className="text-xs text-blue-600">+15% this month</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Email Subscribers</CardTitle>
              <Mail className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{emailStats.subscribers.toLocaleString()}</div>
              <p className="text-xs text-green-600">28.5% open rate</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Social Engagement</CardTitle>
              <Heart className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">12.8%</div>
              <p className="text-xs text-purple-600">Above industry average</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Campaign ROI</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">340%</div>
              <p className="text-xs text-orange-600">Return on ad spend</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
            <TabsTrigger value="social-media">Social Media</TabsTrigger>
            <TabsTrigger value="content-ideas">Content Strategy</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Active Marketing Campaigns</h2>
              <p className="text-gray-600">Monitor and optimize your wellness marketing campaigns across all channels</p>
            </div>

            <div className="space-y-6">
              {activeCampaigns.map((campaign, index) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{campaign.name}</CardTitle>
                        <p className="text-sm text-gray-600">{campaign.type} • Target: {campaign.audience}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                        <Badge variant="outline">
                          Ends in {campaign.endsIn}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">Reach</p>
                        <p className="text-lg font-bold text-blue-700">{campaign.reach.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-sm font-medium text-green-800">Engagement</p>
                        <p className="text-lg font-bold text-green-700">{campaign.engagement}%</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm font-medium text-purple-800">Conversions</p>
                        <p className="text-lg font-bold text-purple-700">{campaign.conversions}</p>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <p className="text-sm font-medium text-orange-800">Budget Used</p>
                        <p className="text-lg font-bold text-orange-700">${campaign.budget}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">View Details</Button>
                      <Button size="sm" variant="outline">Edit Campaign</Button>
                      <Button size="sm" variant="outline">Duplicate</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="social-media" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Social Media Performance</h2>
              <p className="text-gray-600">Track engagement and growth across all social platforms</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(socialMediaStats).map(([platform, stats]) => (
                <Card key={platform} className="border-l-4 border-l-purple-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 capitalize">
                      <Share2 className="h-5 w-5 text-purple-600" />
                      {platform}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Followers</p>
                        <p className="text-2xl font-bold text-purple-700">{stats.followers.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                        <p className="text-xl font-bold text-green-600">+{stats.monthlyGrowth}%</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">Engagement Rate</p>
                      <Progress value={stats.engagement} className="mb-1" />
                      <p className="text-sm text-gray-500">{stats.engagement}%</p>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-800">Top Performing Post</p>
                      <p className="text-sm text-gray-600 mt-1">{stats.topPost}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-green-600" />
                  Email Marketing Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Open Rate</p>
                    <p className="text-lg font-bold text-green-700">{emailStats.openRate}%</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Click Rate</p>
                    <p className="text-lg font-bold text-blue-700">{emailStats.clickRate}%</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm font-medium text-purple-800">Subscribers</p>
                    <p className="text-lg font-bold text-purple-700">{emailStats.subscribers.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-red-800">Unsubscribe</p>
                    <p className="text-lg font-bold text-red-700">{emailStats.unsubscribeRate}%</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-800">Top Performing Subject Line</p>
                  <p className="text-sm text-gray-600 mt-1">"{emailStats.topPerformingSubject}"</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content-ideas" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Strategy & Ideas</h2>
              <p className="text-gray-600">Culturally-aware content ideas to engage diverse wellness audiences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contentIdeas.map((idea, index) => (
                <Card key={index} className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <CardTitle className="text-lg">{idea.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline">{idea.type}</Badge>
                      <Badge variant="outline">{idea.effort} effort</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-800">Target Audience</p>
                      <p className="text-sm text-gray-600">{idea.target}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-800">Cultural Focus</p>
                      <p className="text-sm text-blue-600">{idea.culturalFocus}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-800">Estimated Reach</p>
                      <p className="text-sm text-green-600">{idea.estimatedReach}</p>
                    </div>
                    
                    <Button className="w-full" size="sm">
                      Create Content Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Content Calendar Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-l-blue-500 bg-blue-50">
                    <h4 className="font-semibold text-blue-800">Weekly Themes</h4>
                    <ul className="text-sm text-blue-700 mt-2 space-y-1">
                      <li>• Monday: Motivation & Goal Setting</li>
                      <li>• Wednesday: Cultural Wellness Wisdom</li>
                      <li>• Friday: Community Spotlight</li>
                      <li>• Sunday: Self-Care Sunday</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border-l-4 border-l-green-500 bg-green-50">
                    <h4 className="font-semibold text-green-800">Monthly Features</h4>
                    <ul className="text-sm text-green-700 mt-2 space-y-1">
                      <li>• Heritage Month Celebrations</li>
                      <li>• Seasonal Wellness Challenges</li>
                      <li>• Expert Interview Series</li>
                      <li>• Recipe of the Month</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Testimonials</h2>
              <p className="text-gray-600">Authentic stories from your diverse wellness community</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-l-4 border-l-yellow-500">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{testimonial.photo}</div>
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <p className="text-sm text-gray-600">{testimonial.background}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <blockquote className="text-gray-700 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="text-xs font-medium text-gray-800">Services Used:</p>
                      <p className="text-xs text-gray-600">{testimonial.services}</p>
                    </div>
                    
                    <Button size="sm" className="w-full">
                      Use in Marketing
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Testimonial Collection Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Megaphone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-blue-800">Post-Service Follow-up</h4>
                    <p className="text-sm text-blue-700 mt-1">Automated email requesting feedback 24 hours after service</p>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-green-800">Community Incentives</h4>
                    <p className="text-sm text-green-700 mt-1">Reward program points for verified testimonials and reviews</p>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-purple-800">Social Media Mentions</h4>
                    <p className="text-sm text-purple-700 mt-1">Monitor and curate positive social media mentions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🎯 Marketing Success Strategy
          </h3>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">🌍</div>
              <p className="font-medium">Cultural Authenticity</p>
              <p className="text-gray-600">Honor diverse healing traditions in all messaging</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🤝</div>
              <p className="font-medium">Community Focus</p>
              <p className="text-gray-600">Build relationships, not just transactions</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <p className="font-medium">Data-Driven</p>
              <p className="text-gray-600">Use analytics to optimize campaigns</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💫</div>
              <p className="font-medium">Authentic Stories</p>
              <p className="text-gray-600">Share real transformation journeys</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}