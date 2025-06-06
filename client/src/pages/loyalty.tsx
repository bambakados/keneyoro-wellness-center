import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Crown, Gift, Star, Zap, Heart, ShoppingBag, Dumbbell, Stethoscope } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface LoyaltyProgram {
  id: number;
  userId: number;
  totalPoints: number;
  currentTierLevel: number;
  lifetimeSpent: number;
  joinedAt: Date;
  lastActivity: Date;
}

interface LoyaltyReward {
  id: number;
  name: string;
  description: string;
  category: string;
  pointsCost: number;
  discountPercent: number | null;
  discountAmount: number | null;
  tierRequirement: number;
  isActive: boolean;
  expiryDays: number;
  usageLimit: number;
}

interface UserReward {
  id: number;
  userId: number;
  rewardId: number;
  redeemedAt: Date;
  usedAt: Date | null;
  expiresAt: Date;
  isUsed: boolean;
  usageCount: number;
}

interface LoyaltyTransaction {
  id: number;
  userId: number;
  pointsEarned: number;
  pointsRedeemed: number;
  transactionType: string;
  serviceDetails: string;
  createdAt: Date;
}

export default function Loyalty() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: loyaltyData, isLoading } = useQuery({
    queryKey: ['/api/loyalty/program'],
  });

  const { data: rewardsData } = useQuery({
    queryKey: ['/api/loyalty/rewards'],
  });

  const { data: transactionsData } = useQuery({
    queryKey: ['/api/loyalty/transactions'],
  });

  const redeemMutation = useMutation({
    mutationFn: (rewardId: number) => 
      apiRequest(`/api/loyalty/redeem/${rewardId}`, { method: 'POST' }),
    onSuccess: (data) => {
      toast({
        title: "Reward Redeemed!",
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/loyalty/program'] });
      queryClient.invalidateQueries({ queryKey: ['/api/loyalty/rewards'] });
      queryClient.invalidateQueries({ queryKey: ['/api/loyalty/transactions'] });
    },
    onError: (error: any) => {
      toast({
        title: "Redemption Failed",
        description: error.message || "Unable to redeem reward",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    );
  }

  const loyaltyProgram = loyaltyData?.loyaltyProgram as LoyaltyProgram;
  const availableRewards = rewardsData?.availableRewards || [];
  const userRewards = rewardsData?.userRewards || [];
  const transactions = transactionsData?.transactions || [];

  const getTierName = (level: number) => {
    switch (level) {
      case 1: return 'Bronze';
      case 2: return 'Silver';
      case 3: return 'Gold';
      case 4: return 'Platinum';
      default: return 'Bronze';
    }
  };

  const getTierColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-amber-600';
      case 2: return 'bg-gray-400';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-purple-600';
      default: return 'bg-amber-600';
    }
  };

  const getNextTierThreshold = (level: number) => {
    switch (level) {
      case 1: return 10000; // $100
      case 2: return 25000; // $250
      case 3: return 50000; // $500
      case 4: return null; // Max tier
      default: return 10000;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'restaurant': return <ShoppingBag className="h-5 w-5" />;
      case 'fitness': return <Dumbbell className="h-5 w-5" />;
      case 'clinic': return <Stethoscope className="h-5 w-5" />;
      case 'telehealth': return <Heart className="h-5 w-5" />;
      case 'store': return <ShoppingBag className="h-5 w-5" />;
      case 'premium': return <Crown className="h-5 w-5" />;
      default: return <Gift className="h-5 w-5" />;
    }
  };

  const nextTierThreshold = getNextTierThreshold(loyaltyProgram?.currentTierLevel || 1);
  const progressToNextTier = nextTierThreshold 
    ? ((loyaltyProgram?.lifetimeSpent || 0) / nextTierThreshold) * 100
    : 100;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          KeneYoro Rewards
        </h1>
        <p className="text-gray-600 mt-2">
          Earn points across all our wellness services and unlock exclusive rewards
        </p>
      </div>

      {/* Tier Status Card */}
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Crown className={`h-8 w-8 ${getTierColor(loyaltyProgram?.currentTierLevel || 1)} text-white rounded-full p-1`} />
            <CardTitle className="text-2xl">
              {getTierName(loyaltyProgram?.currentTierLevel || 1)} Member
            </CardTitle>
          </div>
          <CardDescription>
            You have {loyaltyProgram?.totalPoints || 0} points available
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {loyaltyProgram?.totalPoints || 0}
              </div>
              <div className="text-sm text-gray-600">Available Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                ${((loyaltyProgram?.lifetimeSpent || 0) / 100).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {getTierName(loyaltyProgram?.currentTierLevel || 1)}
              </div>
              <div className="text-sm text-gray-600">Current Tier</div>
            </div>
          </div>

          {nextTierThreshold && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to {getTierName((loyaltyProgram?.currentTierLevel || 1) + 1)}</span>
                <span>${((loyaltyProgram?.lifetimeSpent || 0) / 100).toFixed(0)} / ${(nextTierThreshold / 100).toFixed(0)}</span>
              </div>
              <Progress value={Math.min(progressToNextTier, 100)} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Rewards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-6 w-6 text-green-600" />
            Available Rewards
          </CardTitle>
          <CardDescription>
            Redeem your points for exclusive benefits across all KeneYoro services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableRewards.map((reward: LoyaltyReward) => (
              <Card key={reward.id} className="border-2 hover:border-green-200 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(reward.category)}
                      <Badge variant="outline" className="text-xs">
                        {reward.category}
                      </Badge>
                    </div>
                    <Badge variant="secondary">
                      {reward.pointsCost} pts
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{reward.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {reward.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {reward.discountPercent && `${reward.discountPercent}% off`}
                      {reward.discountAmount && `$${(reward.discountAmount / 100).toFixed(2)} value`}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => redeemMutation.mutate(reward.id)}
                      disabled={
                        (loyaltyProgram?.totalPoints || 0) < reward.pointsCost ||
                        redeemMutation.isPending
                      }
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {redeemMutation.isPending ? 'Redeeming...' : 'Redeem'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* My Rewards */}
      {userRewards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              My Rewards
            </CardTitle>
            <CardDescription>
              Your redeemed rewards ready to use
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userRewards.map((userReward: UserReward) => {
                const reward = availableRewards.find((r: LoyaltyReward) => r.id === userReward.rewardId);
                if (!reward) return null;
                
                return (
                  <div key={userReward.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(reward.category)}
                      <div>
                        <div className="font-medium">{reward.name}</div>
                        <div className="text-sm text-gray-600">
                          Expires: {new Date(userReward.expiresAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <Badge variant={userReward.isUsed ? "secondary" : "default"}>
                      {userReward.isUsed ? "Used" : "Available"}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-600" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Your latest point earnings and redemptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.slice(0, 10).map((transaction: LoyaltyTransaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{transaction.serviceDetails}</div>
                  <div className="text-sm text-gray-600">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  {transaction.pointsEarned > 0 && (
                    <div className="text-green-600 font-medium">
                      +{transaction.pointsEarned} pts
                    </div>
                  )}
                  {transaction.pointsRedeemed > 0 && (
                    <div className="text-red-600 font-medium">
                      -{transaction.pointsRedeemed} pts
                    </div>
                  )}
                  <div className="text-xs text-gray-500 capitalize">
                    {transaction.transactionType}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}