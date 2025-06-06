import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award, Target, Calendar, Users, Zap, Heart, ShoppingBag, Dumbbell } from "lucide-react";
import { format } from "date-fns";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface WellnessChallenge {
  id: number;
  title: string;
  description: string;
  season: string;
  year: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  pointsReward: number;
}

interface ChallengeParticipation {
  id: number;
  userId: number;
  challengeId: number;
  joinedAt: string;
  totalScore: number;
  gymVisits: number;
  healthyMeals: number;
  clinicCheckins: number;
  storeHealthPurchases: number;
  isCompleted: boolean;
  user?: {
    fullName: string;
    profileImage: string | null;
  };
}

export default function ChallengesPage() {
  const { toast } = useToast();
  const [selectedActivity, setSelectedActivity] = useState<string>("");

  // Fetch active challenge
  const { data: activeChallengeData } = useQuery({
    queryKey: ["/api/wellness-challenges/active"],
  });

  // Fetch user participation
  const { data: participationData } = useQuery({
    queryKey: ["/api/wellness-challenges/my-participation"],
  });

  // Fetch leaderboard
  const { data: leaderboardData } = useQuery({
    queryKey: ["/api/wellness-challenges", activeChallengeData?.challenge?.id, "leaderboard"],
    enabled: !!activeChallengeData?.challenge?.id,
  });

  // Join challenge mutation
  const joinChallengeMutation = useMutation({
    mutationFn: (challengeId: number) =>
      apiRequest(`/api/wellness-challenges/${challengeId}/join`, {
        method: "POST",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wellness-challenges"] });
      toast({
        title: "Challenge Joined!",
        description: "You've successfully joined the wellness challenge. Start earning points now!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to join challenge. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Record activity mutation
  const recordActivityMutation = useMutation({
    mutationFn: ({ activityType, description }: { activityType: string; description: string }) =>
      apiRequest("/api/wellness-challenges/record-activity", {
        method: "POST",
        body: JSON.stringify({ activityType, description }),
        headers: { "Content-Type": "application/json" },
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/wellness-challenges"] });
      toast({
        title: "Activity Recorded!",
        description: `You earned ${data.points} points! Keep up the great work.`,
      });
      setSelectedActivity("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to record activity. Please try again.",
        variant: "destructive",
      });
    },
  });

  const activeChallenge: WellnessChallenge | null = activeChallengeData?.challenge || null;
  const participation: ChallengeParticipation | null = participationData?.participation || null;
  const leaderboard: ChallengeParticipation[] = leaderboardData?.leaderboard || [];

  const handleJoinChallenge = () => {
    if (activeChallenge) {
      joinChallengeMutation.mutate(activeChallenge.id);
    }
  };

  const handleRecordActivity = (activityType: string, description: string) => {
    recordActivityMutation.mutate({ activityType, description });
  };

  const activityTypes = [
    { 
      type: "gym_visit", 
      label: "Gym Visit", 
      points: 25, 
      icon: <Dumbbell className="h-5 w-5" />,
      description: "Attended a fitness class or gym session"
    },
    { 
      type: "healthy_meal", 
      label: "Healthy Meal", 
      points: 15, 
      icon: <Heart className="h-5 w-5" />,
      description: "Enjoyed a nutritious meal from our restaurant"
    },
    { 
      type: "clinic_checkin", 
      label: "Clinic Check-in", 
      points: 30, 
      icon: <Target className="h-5 w-5" />,
      description: "Completed a health appointment or telehealth session"
    },
    { 
      type: "store_purchase", 
      label: "Health Product Purchase", 
      points: 10, 
      icon: <ShoppingBag className="h-5 w-5" />,
      description: "Purchased wellness products from our store"
    },
  ];

  if (!activeChallenge) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-12 mb-8">
            <Trophy className="h-20 w-20 mx-auto text-blue-500 mb-6" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Wellness Challenges
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Join our exciting seasonal wellness challenges and compete with the KeneYoro community!
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <Dumbbell className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Fitness Goals</h3>
                <p className="text-sm text-gray-600">Track gym visits and fitness class attendance</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <Heart className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Nutrition Focus</h3>
                <p className="text-sm text-gray-600">Log healthy meals from our African cuisine menu</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <Target className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Health Checkups</h3>
                <p className="text-sm text-gray-600">Complete wellness appointments and assessments</p>
              </div>
            </div>
            <div className="mt-8">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                🌟 New Challenge Coming Soon - Spring 2025!
              </Badge>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const challengeProgress = participation ? 
    Math.min((participation.totalScore / activeChallenge.pointsReward) * 100, 100) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">🏆 Wellness Challenge</h1>
              <p className="text-green-100 text-lg">Join the KeneYoro community and transform your wellness journey!</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">{leaderboard.length}</div>
                <div className="text-sm opacity-90">Active Participants</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Challenge Overview */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{activeChallenge.title}</CardTitle>
                  <CardDescription className="mt-2">{activeChallenge.description}</CardDescription>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {activeChallenge.season.charAt(0).toUpperCase() + activeChallenge.season.slice(1)} {activeChallenge.year}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(activeChallenge.startDate), "MMM d")} - {format(new Date(activeChallenge.endDate), "MMM d")}
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  {activeChallenge.pointsReward} points reward
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {!participation ? (
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Ready to Join the Challenge?</h3>
                  <p className="text-gray-600 mb-4">Start earning points by completing activities across all KeneYoro services!</p>
                  <Button 
                    onClick={handleJoinChallenge} 
                    disabled={joinChallengeMutation.isPending}
                    size="lg"
                  >
                    {joinChallengeMutation.isPending ? "Joining..." : "Join Challenge"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">Your Progress</h3>
                      <span className="text-sm text-gray-600">
                        {participation.totalScore} / {activeChallenge.pointsReward} points
                      </span>
                    </div>
                    <Progress value={challengeProgress} className="h-3" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                      <Dumbbell className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">{participation.gymVisits}</div>
                      <div className="text-sm text-gray-600">Gym Visits</div>
                      {participation.gymVisits >= 5 && <div className="text-xs text-blue-600 mt-1">🔥 On Fire!</div>}
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                      <Heart className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">{participation.healthyMeals}</div>
                      <div className="text-sm text-gray-600">Healthy Meals</div>
                      {participation.healthyMeals >= 10 && <div className="text-xs text-green-600 mt-1">🌟 Nutrition Star!</div>}
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-200">
                      <Target className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-600">{participation.clinicCheckins}</div>
                      <div className="text-sm text-gray-600">Clinic Check-ins</div>
                      {participation.clinicCheckins >= 3 && <div className="text-xs text-purple-600 mt-1">💎 Health Hero!</div>}
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-200">
                      <ShoppingBag className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-orange-600">{participation.storeHealthPurchases}</div>
                      <div className="text-sm text-gray-600">Store Purchases</div>
                      {participation.storeHealthPurchases >= 5 && <div className="text-xs text-orange-600 mt-1">🛍️ Wellness Shopper!</div>}
                    </div>
                  </div>

                  {/* Achievement Milestones */}
                  {participation.totalScore >= 100 && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 text-white">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">🎉</div>
                        <div>
                          <h4 className="font-semibold">Milestone Achieved!</h4>
                          <p className="text-sm opacity-90">You've reached 100+ points! You're crushing this challenge!</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Record New Activity</h3>
                      <div className="text-sm text-gray-500">
                        Daily goal: 1 activity
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activityTypes.map((activity) => (
                        <Button
                          key={activity.type}
                          variant="outline"
                          className="h-auto p-4 justify-start"
                          onClick={() => handleRecordActivity(activity.type, activity.description)}
                          disabled={recordActivityMutation.isPending}
                        >
                          <div className="flex items-center gap-3">
                            {activity.icon}
                            <div className="text-left">
                              <div className="font-medium">{activity.label}</div>
                              <div className="text-sm text-gray-500">+{activity.points} points</div>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Community Leaderboard
                  </CardTitle>
                  <CardDescription>See how you rank against other KeneYoro members</CardDescription>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Live Rankings
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.slice(0, 10).map((participant, index) => (
                  <div key={participant.id} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 text-center">
                      {index === 0 && <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />}
                      {index === 1 && <Medal className="h-5 w-5 text-gray-400 mx-auto" />}
                      {index === 2 && <Award className="h-5 w-5 text-amber-600 mx-auto" />}
                      {index > 2 && <span className="text-gray-500">#{index + 1}</span>}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={participant.user?.profileImage || ""} />
                      <AvatarFallback>
                        {participant.user?.fullName?.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {participant.user?.fullName || 'Anonymous User'}
                      </div>
                      <div className="text-xs text-gray-500">{participant.totalScore} points</div>
                    </div>
                    {participation?.userId === participant.userId && (
                      <Badge variant="secondary" className="text-xs">You</Badge>
                    )}
                  </div>
                ))}
                {leaderboard.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No participants yet. Be the first to join!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}