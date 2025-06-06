import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { Activity, Heart, Droplets, Moon, Smile, Zap, Target, TrendingUp, Calendar, Award } from "lucide-react";
import { Helmet } from "react-helmet";

interface DailyHealthLog {
  id: number;
  userId: number;
  date: string;
  steps: number;
  caloriesBurned: number;
  waterIntake: number;
  sleepHours: number;
  moodScore: number;
  energyLevel: number;
  stressLevel: number;
  workoutMinutes: number;
  meditationMinutes: number;
  createdAt: string;
}

interface HealthMetric {
  id: number;
  userId: number;
  metricType: string;
  metricName: string;
  value: number;
  unit: string;
  date: string;
  notes?: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function HealthTracking() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [newLogData, setNewLogData] = useState({
    steps: 0,
    caloriesBurned: 0,
    waterIntake: 0,
    sleepHours: 8,
    moodScore: 5,
    energyLevel: 5,
    stressLevel: 5,
    workoutMinutes: 0,
    meditationMinutes: 0
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch daily health logs for the past 30 days
  const { data: healthLogs = [], isLoading } = useQuery({
    queryKey: ['/api/health/daily-logs'],
    queryFn: async () => {
      const response = await fetch('/api/health/daily-logs');
      if (!response.ok) throw new Error('Failed to fetch health logs');
      return response.json();
    }
  });

  // Fetch health metrics
  const { data: healthMetrics = [] } = useQuery({
    queryKey: ['/api/health/metrics'],
    queryFn: async () => {
      const response = await fetch('/api/health/metrics');
      if (!response.ok) throw new Error('Failed to fetch health metrics');
      return response.json();
    }
  });

  // Create daily health log mutation
  const createLogMutation = useMutation({
    mutationFn: async (logData: any) => {
      return apiRequest(`/api/health/daily-logs`, {
        method: 'POST',
        body: JSON.stringify({ ...logData, date: selectedDate })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/health/daily-logs'] });
      toast({
        title: "Health log saved!",
        description: "Your daily health data has been recorded successfully.",
      });
      // Reset form
      setNewLogData({
        steps: 0,
        caloriesBurned: 0,
        waterIntake: 0,
        sleepHours: 8,
        moodScore: 5,
        energyLevel: 5,
        stressLevel: 5,
        workoutMinutes: 0,
        meditationMinutes: 0
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save health log. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createLogMutation.mutate(newLogData);
  };

  // Calculate weekly averages and trends
  const weeklyData = healthLogs.slice(-7).map((log: DailyHealthLog) => ({
    date: new Date(log.date).toLocaleDateString('en-US', { weekday: 'short' }),
    steps: log.steps,
    calories: log.caloriesBurned,
    water: log.waterIntake,
    sleep: log.sleepHours,
    mood: log.moodScore,
    energy: log.energyLevel,
    stress: 10 - log.stressLevel, // Invert stress for better visualization
    workout: log.workoutMinutes
  }));

  // Calculate health score
  const calculateHealthScore = () => {
    if (healthLogs.length === 0) return 0;
    const recent = healthLogs.slice(-7);
    const avgSteps = recent.reduce((sum: number, log: DailyHealthLog) => sum + log.steps, 0) / recent.length;
    const avgSleep = recent.reduce((sum: number, log: DailyHealthLog) => sum + log.sleepHours, 0) / recent.length;
    const avgMood = recent.reduce((sum: number, log: DailyHealthLog) => sum + log.moodScore, 0) / recent.length;
    const avgEnergy = recent.reduce((sum: number, log: DailyHealthLog) => sum + log.energyLevel, 0) / recent.length;
    
    const stepScore = Math.min((avgSteps / 10000) * 25, 25);
    const sleepScore = Math.min((avgSleep / 8) * 25, 25);
    const moodScore = (avgMood / 10) * 25;
    const energyScore = (avgEnergy / 10) * 25;
    
    return Math.round(stepScore + sleepScore + moodScore + energyScore);
  };

  const healthScore = calculateHealthScore();

  // Wellness insights
  const getWellnessInsights = () => {
    if (healthLogs.length === 0) return [];
    
    const recent = healthLogs.slice(-7);
    const insights = [];
    
    const avgSteps = recent.reduce((sum: number, log: DailyHealthLog) => sum + log.steps, 0) / recent.length;
    if (avgSteps >= 10000) {
      insights.push({ type: 'success', message: 'Excellent step count! You\'re hitting your daily goal consistently.' });
    } else if (avgSteps >= 7500) {
      insights.push({ type: 'warning', message: 'Good activity level! Try to reach 10,000 steps daily for optimal health.' });
    }
    
    const avgSleep = recent.reduce((sum: number, log: DailyHealthLog) => sum + log.sleepHours, 0) / recent.length;
    if (avgSleep >= 7) {
      insights.push({ type: 'success', message: 'Great sleep habits! You\'re getting quality rest.' });
    } else {
      insights.push({ type: 'warning', message: 'Consider improving your sleep schedule. Aim for 7-9 hours nightly.' });
    }
    
    const avgMood = recent.reduce((sum: number, log: DailyHealthLog) => sum + log.moodScore, 0) / recent.length;
    if (avgMood >= 7) {
      insights.push({ type: 'success', message: 'Your mood has been consistently positive this week!' });
    }
    
    return insights;
  };

  const insights = getWellnessInsights();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-lg">Loading your health data...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Health Tracking Dashboard - KeneYoro</title>
        <meta name="description" content="Track your daily health metrics, view wellness trends, and monitor your progress on your KeneYoro wellness journey." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🌿 Your Health Journey
          </h1>
          <p className="text-lg text-gray-600">
            Track your wellness progress with comprehensive health monitoring and beautiful visualizations
          </p>
        </div>

        {/* Health Score Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="md:col-span-1">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Health Score</CardTitle>
              <CardDescription>Overall wellness rating</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-green-500 p-1">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">{healthScore}</span>
                  </div>
                </div>
              </div>
              <Progress value={healthScore} className="w-full" />
              <p className="text-sm text-gray-600 mt-2">
                {healthScore >= 80 ? 'Excellent!' : healthScore >= 60 ? 'Good progress' : 'Keep improving'}
              </p>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Weekly Activity Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="steps"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="log">Log Data</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Daily Steps</CardTitle>
                  <Activity className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {healthLogs.length > 0 ? healthLogs[healthLogs.length - 1]?.steps?.toLocaleString() : '0'}
                  </div>
                  <p className="text-xs text-muted-foreground">Goal: 10,000 steps</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Water Intake</CardTitle>
                  <Droplets className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {healthLogs.length > 0 ? healthLogs[healthLogs.length - 1]?.waterIntake : '0'} oz
                  </div>
                  <p className="text-xs text-muted-foreground">Goal: 64 oz daily</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sleep Hours</CardTitle>
                  <Moon className="h-4 w-4 text-indigo-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {healthLogs.length > 0 ? healthLogs[healthLogs.length - 1]?.sleepHours : '0'}h
                  </div>
                  <p className="text-xs text-muted-foreground">Goal: 7-9 hours</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Mood Score</CardTitle>
                  <Smile className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {healthLogs.length > 0 ? healthLogs[healthLogs.length - 1]?.moodScore : '0'}/10
                  </div>
                  <p className="text-xs text-muted-foreground">Today's wellness</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Progress</CardTitle>
                  <CardDescription>Your activity levels over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="steps" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sleep & Mood Trends</CardTitle>
                  <CardDescription>Quality metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="sleep" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="mood" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="log" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Log Your Daily Health Data
                </CardTitle>
                <CardDescription>
                  Record your daily wellness metrics to track your KeneYoro journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="steps">Steps</Label>
                      <Input
                        id="steps"
                        type="number"
                        placeholder="Daily steps"
                        value={newLogData.steps}
                        onChange={(e) => setNewLogData({...newLogData, steps: parseInt(e.target.value) || 0})}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="calories">Calories Burned</Label>
                      <Input
                        id="calories"
                        type="number"
                        placeholder="Calories burned"
                        value={newLogData.caloriesBurned}
                        onChange={(e) => setNewLogData({...newLogData, caloriesBurned: parseInt(e.target.value) || 0})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="water">Water Intake (oz)</Label>
                      <Input
                        id="water"
                        type="number"
                        placeholder="Water in ounces"
                        value={newLogData.waterIntake}
                        onChange={(e) => setNewLogData({...newLogData, waterIntake: parseInt(e.target.value) || 0})}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Sleep Hours: {newLogData.sleepHours}h</Label>
                      <Slider
                        value={[newLogData.sleepHours]}
                        onValueChange={(value) => setNewLogData({...newLogData, sleepHours: value[0]})}
                        max={12}
                        min={0}
                        step={0.5}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Mood Score: {newLogData.moodScore}/10</Label>
                      <Slider
                        value={[newLogData.moodScore]}
                        onValueChange={(value) => setNewLogData({...newLogData, moodScore: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Energy Level: {newLogData.energyLevel}/10</Label>
                      <Slider
                        value={[newLogData.energyLevel]}
                        onValueChange={(value) => setNewLogData({...newLogData, energyLevel: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Stress Level: {newLogData.stressLevel}/10</Label>
                      <Slider
                        value={[newLogData.stressLevel]}
                        onValueChange={(value) => setNewLogData({...newLogData, stressLevel: value[0]})}
                        max={10}
                        min={1}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="workout">Workout Minutes</Label>
                      <Input
                        id="workout"
                        type="number"
                        placeholder="Exercise duration"
                        value={newLogData.workoutMinutes}
                        onChange={(e) => setNewLogData({...newLogData, workoutMinutes: parseInt(e.target.value) || 0})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="meditation">Meditation Minutes</Label>
                      <Input
                        id="meditation"
                        type="number"
                        placeholder="Mindfulness time"
                        value={newLogData.meditationMinutes}
                        onChange={(e) => setNewLogData({...newLogData, meditationMinutes: parseInt(e.target.value) || 0})}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={createLogMutation.isPending}
                  >
                    {createLogMutation.isPending ? 'Saving...' : 'Save Health Log'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  Wellness Insights
                </CardTitle>
                <CardDescription>
                  Personalized recommendations based on your health data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.length > 0 ? (
                  insights.map((insight, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      insight.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
                    }`}>
                      <p className={`font-medium ${
                        insight.type === 'success' ? 'text-green-800' : 'text-yellow-800'
                      }`}>
                        {insight.message}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Start logging your health data to receive personalized insights!</p>
                  </div>
                )}

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">KeneYoro Wellness Tips</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">🏃‍♀️ Stay Active</h4>
                      <p className="text-blue-700 text-sm">
                        Aim for 10,000 steps daily. Use our gym facilities for strength training and cardio workouts.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">🥗 Nutrition Matters</h4>
                      <p className="text-green-700 text-sm">
                        Try our African-inspired healthy meals rich in nutrients and traditional healing properties.
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-800 mb-2">💤 Quality Sleep</h4>
                      <p className="text-purple-700 text-sm">
                        Maintain consistent sleep schedule. Our wellness consultations can help improve sleep quality.
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-medium text-orange-800 mb-2">🧘‍♀️ Mental Wellness</h4>
                      <p className="text-orange-700 text-sm">
                        Practice mindfulness and stress management. Join our yoga and meditation classes.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}