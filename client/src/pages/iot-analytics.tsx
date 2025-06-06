import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Smartphone, 
  Heart, 
  Activity, 
  Thermometer,
  Droplets,
  Wind,
  Sun,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Wifi,
  Battery
} from "lucide-react";
import { Helmet } from "react-helmet";

export default function IoTAnalytics() {
  const [connectedDevices, setConnectedDevices] = useState(0);
  const [realTimeData, setRealTimeData] = useState({
    heartRate: 72,
    steps: 8247,
    bloodPressure: "118/78",
    temperature: 98.6,
    oxygenSaturation: 98,
    stressLevel: 3.2,
    sleepQuality: 85,
    hydrationLevel: 78
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        heartRate: Math.max(60, Math.min(100, prev.heartRate + (Math.random() - 0.5) * 4)),
        steps: prev.steps + Math.floor(Math.random() * 10),
        stressLevel: Math.max(1, Math.min(10, prev.stressLevel + (Math.random() - 0.5) * 0.5)),
        hydrationLevel: Math.max(0, Math.min(100, prev.hydrationLevel + (Math.random() - 0.5) * 2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Connected IoT devices
  const iotDevices = [
    {
      id: 1,
      name: "Fitbit Sense 2",
      type: "Fitness Tracker",
      status: "connected",
      battery: 85,
      lastSync: "2 minutes ago",
      metrics: ["Heart Rate", "Steps", "Sleep", "Stress"],
      culturalIntegration: "Tracks traditional dance sessions and meditation practices"
    },
    {
      id: 2,
      name: "Omron Blood Pressure Monitor",
      type: "Health Monitor",
      status: "connected",
      battery: 92,
      lastSync: "5 minutes ago",
      metrics: ["Blood Pressure", "Heart Rate"],
      culturalIntegration: "Monitors effectiveness of traditional hypertension remedies"
    },
    {
      id: 3,
      name: "Smart Scale Body Composition",
      type: "Body Metrics",
      status: "connected",
      battery: 78,
      lastSync: "1 hour ago",
      metrics: ["Weight", "Body Fat", "Muscle Mass", "BMI"],
      culturalIntegration: "Tracks progress with traditional Guinea nutrition plans"
    },
    {
      id: 4,
      name: "Air Quality Monitor",
      type: "Environmental",
      status: "pending",
      battery: 0,
      lastSync: "Not connected",
      metrics: ["Air Quality", "Humidity", "Temperature"],
      culturalIntegration: "Optimizes environment for traditional healing practices"
    }
  ];

  // Predictive health insights
  const healthPredictions = [
    {
      id: 1,
      type: "cardiovascular",
      severity: "low",
      title: "Optimal Heart Health Trajectory",
      prediction: "Based on your current heart rate patterns and traditional Guinea healing practices, your cardiovascular health is on an excellent trajectory.",
      confidence: 94,
      timeframe: "Next 30 days",
      recommendations: [
        "Continue African dance sessions 3x weekly",
        "Maintain hibiscus tea daily routine",
        "Add 10 minutes of traditional breathing exercises"
      ],
      culturalWisdom: "Guinea tradition: 'A strong heart beats in rhythm with community drums'"
    },
    {
      id: 2,
      type: "stress",
      severity: "medium",
      title: "Stress Pattern Alert",
      prediction: "Your stress levels show elevation during 2-4 PM daily. Traditional Guinea stress management could prevent escalation.",
      confidence: 87,
      timeframe: "Next 7 days",
      recommendations: [
        "Schedule 15-minute kinkéliba tea breaks at 2 PM",
        "Practice traditional Guinea meditation techniques",
        "Join community drum circle sessions"
      ],
      culturalWisdom: "Ancient saying: 'When the mind is troubled, let the ancestors' drums heal the spirit'"
    },
    {
      id: 3,
      type: "nutrition",
      severity: "high",
      title: "Nutritional Optimization Opportunity",
      prediction: "Your metabolic patterns suggest enhanced energy potential with traditional Guinea superfoods integration.",
      confidence: 91,
      timeframe: "Next 14 days",
      recommendations: [
        "Increase moringa leaf consumption to 2 servings daily",
        "Add baobab fruit to morning routine",
        "Incorporate traditional Guinea protein sources"
      ],
      culturalWisdom: "Mandingo wisdom: 'The tree of life (baobab) gives strength to those who honor its gifts'"
    }
  ];

  // Environmental wellness data
  const environmentalData = {
    airQuality: 78,
    humidity: 45,
    temperature: 72,
    lightLevel: 850,
    noiseLevel: 35,
    recommendations: [
      "Air quality optimal for meditation practices",
      "Humidity perfect for traditional incense burning",
      "Temperature ideal for African dance sessions",
      "Light levels support circadian rhythm balance"
    ]
  };

  // Cultural health mapping (aggregated anonymous data)
  const culturalHealthInsights = [
    {
      practice: "Daily Hibiscus Tea Consumption",
      participants: 127,
      avgImprovement: "23% blood pressure reduction",
      culturalSignificance: "Traditional Guinea cardiovascular support",
      modernValidation: "Clinical studies confirm ACE inhibitor properties"
    },
    {
      practice: "African Dance Movement Therapy",
      participants: 89,
      avgImprovement: "31% stress reduction, 18% fitness improvement",
      culturalSignificance: "Community healing through rhythmic movement",
      modernValidation: "Research shows improved mental health and cardiovascular fitness"
    },
    {
      practice: "Moringa Supplementation",
      participants: 156,
      avgImprovement: "27% energy increase, 15% iron level improvement",
      culturalSignificance: "Miracle tree of Guinea for vitality",
      modernValidation: "High bioavailable iron and antioxidant content confirmed"
    },
    {
      practice: "Traditional Meditation Practices",
      participants: 73,
      avgImprovement: "35% sleep quality improvement",
      culturalSignificance: "Ancestral mindfulness techniques",
      modernValidation: "Neurological benefits match established meditation research"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected": return "text-green-600";
      case "pending": return "text-yellow-600";
      case "disconnected": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "border-orange-500 bg-orange-50";
      case "medium": return "border-yellow-500 bg-yellow-50";
      case "low": return "border-green-500 bg-green-50";
      default: return "border-gray-500 bg-gray-50";
    }
  };

  return (
    <>
      <Helmet>
        <title>IoT Analytics & Insights - KeneYoro Wellness Center</title>
        <meta name="description" content="Smart health monitoring with IoT integration and predictive analytics combining traditional Guinea wisdom with modern technology at KeneYoro." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📊 Smart Health Analytics
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real-time health monitoring with IoT integration, predictive analytics, and cultural wellness insights 
            that honor traditional Guinea healing wisdom while leveraging cutting-edge technology.
          </p>
        </div>

        <Tabs defaultValue="real-time" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="real-time">Real-Time Data</TabsTrigger>
            <TabsTrigger value="devices">Connected Devices</TabsTrigger>
            <TabsTrigger value="predictions">Health Predictions</TabsTrigger>
            <TabsTrigger value="community-insights">Community Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="real-time" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Live Health Monitoring</h2>
              <p className="text-gray-600">Real-time biometric data with traditional Guinea wellness context</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-red-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                  <Heart className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-800">{Math.round(realTimeData.heartRate)}</div>
                  <p className="text-xs text-red-600">bpm • Optimal range</p>
                  <p className="text-xs text-gray-600 mt-2">🌿 Traditional: Strong like baobab tree</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Daily Steps</CardTitle>
                  <Activity className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-800">{realTimeData.steps.toLocaleString()}</div>
                  <p className="text-xs text-blue-600">Goal: 10,000 • 82% complete</p>
                  <p className="text-xs text-gray-600 mt-2">🥁 Traditional: Dance brings vitality</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Stress Level</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-800">{realTimeData.stressLevel.toFixed(1)}/10</div>
                  <p className="text-xs text-purple-600">Low stress • Well managed</p>
                  <p className="text-xs text-gray-600 mt-2">🍃 Traditional: Kinkéliba tea soothes mind</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-cyan-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hydration</CardTitle>
                  <Droplets className="h-4 w-4 text-cyan-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-cyan-800">{Math.round(realTimeData.hydrationLevel)}%</div>
                  <p className="text-xs text-cyan-600">Daily goal progress</p>
                  <p className="text-xs text-gray-600 mt-2">💧 Traditional: Water is life essence</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-yellow-600" />
                    Environmental Wellness
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-sm">Air Quality</p>
                      <div className="flex items-center gap-2">
                        <Progress value={environmentalData.airQuality} className="flex-1" />
                        <span className="text-sm text-green-600">{environmentalData.airQuality}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Humidity</p>
                      <div className="flex items-center gap-2">
                        <Progress value={environmentalData.humidity} className="flex-1" />
                        <span className="text-sm text-blue-600">{environmentalData.humidity}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-medium text-sm">Wellness Recommendations:</p>
                    {environmentalData.recommendations.map((rec, index) => (
                      <p key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {rec}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Traditional Health Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-sm text-green-800">Blood Pressure</p>
                    <p className="text-lg font-bold text-green-700">{realTimeData.bloodPressure}</p>
                    <p className="text-xs text-green-600">Hibiscus tea regimen effective</p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-sm text-blue-800">Sleep Quality</p>
                    <p className="text-lg font-bold text-blue-700">{realTimeData.sleepQuality}%</p>
                    <p className="text-xs text-blue-600">Traditional meditation practice benefits</p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="font-medium text-sm text-purple-800">Oxygen Saturation</p>
                    <p className="text-lg font-bold text-purple-700">{realTimeData.oxygenSaturation}%</p>
                    <p className="text-xs text-purple-600">African dance breathing techniques working</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Connected IoT Devices</h2>
              <p className="text-gray-600">Manage your smart health monitoring ecosystem</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {iotDevices.map((device) => (
                <Card key={device.id} className={`border-l-4 ${device.status === 'connected' ? 'border-l-green-500' : 'border-l-yellow-500'}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-6 w-6 text-gray-600" />
                        <div>
                          <CardTitle className="text-lg">{device.name}</CardTitle>
                          <p className="text-sm text-gray-600">{device.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wifi className={`h-4 w-4 ${getStatusColor(device.status)}`} />
                        <Badge variant={device.status === 'connected' ? 'default' : 'secondary'}>
                          {device.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Battery Level</span>
                      <div className="flex items-center gap-2">
                        <Progress value={device.battery} className="w-20 h-2" />
                        <span className="text-gray-600">{device.battery}%</span>
                        <Battery className="h-3 w-3 text-gray-500" />
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-medium">Last Sync: </span>
                      <span className="text-gray-600">{device.lastSync}</span>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm mb-2">Tracking Metrics:</p>
                      <div className="flex flex-wrap gap-1">
                        {device.metrics.map((metric, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {metric}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-700">
                        <strong>Cultural Integration:</strong> {device.culturalIntegration}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Predictive Health Insights</h2>
              <p className="text-gray-600">AI-powered health predictions with traditional Guinea wisdom</p>
            </div>

            <div className="space-y-6">
              {healthPredictions.map((prediction) => (
                <Card key={prediction.id} className={`border-l-4 ${getSeverityColor(prediction.severity)}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                          {prediction.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          Prediction Confidence: {prediction.confidence}% • {prediction.timeframe}
                        </p>
                      </div>
                      <Badge variant="outline" className={`${prediction.severity === 'low' ? 'bg-green-50 text-green-700' : 
                        prediction.severity === 'medium' ? 'bg-yellow-50 text-yellow-700' : 'bg-orange-50 text-orange-700'}`}>
                        {prediction.severity} priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{prediction.prediction}</p>
                    
                    <div>
                      <p className="font-medium text-sm mb-2">Recommended Actions:</p>
                      <ul className="space-y-1">
                        {prediction.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700 italic">
                        <strong>Cultural Wisdom:</strong> {prediction.culturalWisdom}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community-insights" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Cultural Health Mapping</h2>
              <p className="text-gray-600">Anonymous community data showing traditional practice effectiveness</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {culturalHealthInsights.map((insight, index) => (
                <Card key={index} className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <CardTitle className="text-lg">{insight.practice}</CardTitle>
                    <p className="text-sm text-gray-600">{insight.participants} community participants</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-sm text-green-800">Average Improvement</p>
                      <p className="text-lg font-bold text-green-700">{insight.avgImprovement}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm text-blue-800">Cultural Significance</p>
                      <p className="text-sm text-gray-700">{insight.culturalSignificance}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm text-purple-800">Modern Validation</p>
                      <p className="text-sm text-gray-700">{insight.modernValidation}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                📈 Community Impact Metrics
              </h3>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600">445</div>
                  <p className="text-sm text-gray-600">Active participants in traditional practices</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">89%</div>
                  <p className="text-sm text-gray-600">Report improved wellness outcomes</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">26%</div>
                  <p className="text-sm text-gray-600">Average health improvement across all metrics</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">12</div>
                  <p className="text-sm text-gray-600">Traditional practices scientifically validated</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}