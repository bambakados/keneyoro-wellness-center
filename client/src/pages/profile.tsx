import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Activity, Award, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Link, useLocation } from "wouter";

export default function Profile() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  // Fetch user data
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ['/api/auth/me'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/auth/me');
      return res.json();
    },
  });

  // Fetch user appointments
  const { data: appointmentsData, isLoading: appointmentsLoading } = useQuery({
    queryKey: ['/api/appointments'],
    queryFn: async () => {
      try {
        const res = await apiRequest('GET', '/api/appointments');
        return res.json();
      } catch (error) {
        return { appointments: [] };
      }
    },
    enabled: !!userData?.user,
  });

  // Fetch user health metrics
  const { data: healthMetricsData } = useQuery({
    queryKey: ['/api/auth/me'],
    queryFn: async () => {
      try {
        // In a real app, this would fetch from the API
        return {
          metrics: {
            activityGoal: 75,
            nutritionGoal: 60,
            sleepQuality: 85
          },
          progress: {
            gymVisits: 12,
            healthyMeals: 18,
            healthPoints: 245
          }
        };
      } catch (error) {
        return { metrics: null, progress: null };
      }
    },
    enabled: !!userData?.user,
  });

  // Handle logout
  const handleLogout = async () => {
    try {
      await apiRequest('POST', '/api/auth/logout');
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      setLocation('/');
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (userLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-neutral-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userData?.user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Restricted</h1>
          <p className="text-neutral-600 mb-6">You need to log in to view your profile.</p>
          <Link href="/auth/login">
            <a className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition">
              Log In
            </a>
          </Link>
        </div>
      </div>
    );
  }

  const user = userData.user;
  const appointments = appointmentsData?.appointments || [];
  const metrics = healthMetricsData?.metrics || { activityGoal: 0, nutritionGoal: 0, sleepQuality: 0 };
  const progress = healthMetricsData?.progress || { gymVisits: 0, healthyMeals: 0, healthPoints: 0 };

  return (
    <>
      <Helmet>
        <title>My Profile | HealthHub</title>
        <meta name="description" content="View and manage your HealthHub profile, appointments, and wellness journey." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800">My Profile</h1>
          <p className="text-neutral-600">Manage your account and wellness journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user.profileImage || ''} alt={user.fullName} />
                  <AvatarFallback className="bg-primary text-white text-xl">
                    {user.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{user.fullName}</CardTitle>
                <CardDescription>Member since {new Date(user.createdAt).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-neutral-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Username</p>
                    <p className="font-medium">{user.username}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="pt-2">
                    <p className="font-medium mb-2">Membership Status</p>
                    <div className="bg-primary/10 text-primary font-medium text-sm py-1 px-3 rounded-full inline-block">
                      Active Member
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-2">Health Points</p>
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="font-bold text-xl">{progress.healthPoints}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-4">
                <Button variant="outline" onClick={handleLogout}>
                  Log Out
                </Button>
                <Button variant="outline">
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="dashboard">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="dashboard" className="flex-1">Dashboard</TabsTrigger>
                <TabsTrigger value="appointments" className="flex-1">Appointments</TabsTrigger>
                <TabsTrigger value="memberships" className="flex-1">Memberships</TabsTrigger>
                <TabsTrigger value="orders" className="flex-1">Orders</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Health Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-neutral-700">Activity Goal</span>
                            <span className="text-sm text-neutral-500">{metrics.activityGoal}%</span>
                          </div>
                          <Progress value={metrics.activityGoal} className="h-2 bg-neutral-200" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-neutral-700">Nutrition Goal</span>
                            <span className="text-sm text-neutral-500">{metrics.nutritionGoal}%</span>
                          </div>
                          <Progress value={metrics.nutritionGoal} className="h-2 bg-neutral-200" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-neutral-700">Sleep Quality</span>
                            <span className="text-sm text-neutral-500">{metrics.sleepQuality}%</span>
                          </div>
                          <Progress value={metrics.sleepQuality} className="h-2 bg-neutral-200" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href="/dashboard/metrics">
                        <a className="text-primary hover:underline text-sm">View detailed metrics →</a>
                      </Link>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Monthly Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Activity className="h-10 w-10 p-2 bg-secondary/10 text-secondary rounded-full mr-4" />
                          <div>
                            <p className="font-medium">Gym Visits</p>
                            <p className="text-2xl font-bold">{progress.gymVisits}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <ShoppingCart className="h-10 w-10 p-2 bg-accent/10 text-accent rounded-full mr-4" />
                          <div>
                            <p className="font-medium">Healthy Meals</p>
                            <p className="text-2xl font-bold">{progress.healthyMeals}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href="/dashboard">
                        <a className="text-primary hover:underline text-sm">View full dashboard →</a>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Upcoming Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {appointmentsLoading ? (
                      <div className="text-center py-4">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-sm text-neutral-500 mt-2">Loading appointments...</p>
                      </div>
                    ) : appointments.length > 0 ? (
                      <div className="space-y-4">
                        {appointments.slice(0, 3).map((appointment) => (
                          <div key={appointment.id} className="flex p-4 bg-neutral-50 rounded-lg">
                            <div className="mr-4">
                              {appointment.serviceType === 'clinic' ? (
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                  <i className="ri-hospital-line text-xl text-primary"></i>
                                </div>
                              ) : appointment.serviceType === 'gym' ? (
                                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                                  <i className="ri-heart-pulse-line text-xl text-secondary"></i>
                                </div>
                              ) : (
                                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                                  <i className="ri-restaurant-line text-xl text-accent"></i>
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{appointment.serviceName}</p>
                              <p className="text-sm text-neutral-600">{appointment.providerName}</p>
                              <div className="flex mt-2 text-sm text-neutral-500">
                                <div className="flex items-center mr-4">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {appointment.date}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {appointment.time}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 mx-auto text-neutral-400 mb-2" />
                        <p className="text-neutral-600">You don't have any upcoming appointments</p>
                        <Link href="/appointments">
                          <a className="mt-4 inline-block text-primary hover:underline">Book an appointment</a>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                  {appointments.length > 0 && (
                    <CardFooter>
                      <Link href="/appointments">
                        <a className="text-primary hover:underline text-sm">View all appointments →</a>
                      </Link>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>
              
              <TabsContent value="appointments">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>My Appointments</CardTitle>
                      <Link href="/appointments">
                        <a className="bg-primary hover:bg-primary-dark text-white text-sm font-medium py-2 px-4 rounded-lg transition">
                          Book New
                        </a>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {appointmentsLoading ? (
                      <div className="text-center py-4">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-sm text-neutral-500 mt-2">Loading appointments...</p>
                      </div>
                    ) : appointments.length > 0 ? (
                      <div className="space-y-4">
                        {appointments.map((appointment) => (
                          <div key={appointment.id} className="flex p-4 bg-neutral-50 rounded-lg">
                            <div className="mr-4">
                              {appointment.serviceType === 'clinic' ? (
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                  <i className="ri-hospital-line text-xl text-primary"></i>
                                </div>
                              ) : appointment.serviceType === 'gym' ? (
                                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                                  <i className="ri-heart-pulse-line text-xl text-secondary"></i>
                                </div>
                              ) : (
                                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                                  <i className="ri-restaurant-line text-xl text-accent"></i>
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{appointment.serviceName}</p>
                              <p className="text-sm text-neutral-600">{appointment.providerName}</p>
                              <div className="flex mt-2 text-sm text-neutral-500">
                                <div className="flex items-center mr-4">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {appointment.date}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {appointment.time}
                                </div>
                              </div>
                            </div>
                            <div>
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                appointment.status === 'confirmed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : appointment.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 mx-auto text-neutral-400 mb-2" />
                        <p className="text-neutral-600">You don't have any appointments</p>
                        <Link href="/appointments">
                          <a className="mt-4 inline-block text-primary hover:underline">Book your first appointment</a>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="memberships">
                <Card>
                  <CardHeader>
                    <CardTitle>Membership Plans</CardTitle>
                    <CardDescription>Manage your membership options across all our services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">Wellness Complete Plan</h3>
                            <p className="text-neutral-600">Access to all HealthHub services</p>
                            <div className="mt-2 flex">
                              <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded mr-2">Active</span>
                              <span className="bg-neutral-100 text-neutral-700 text-xs font-medium px-2 py-1 rounded">Auto-renews on 12/15/2023</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">$99<span className="text-sm font-normal text-neutral-600">/mo</span></p>
                          </div>
                        </div>
                      </div>
                      
                      <h4 className="font-medium text-lg">Other Available Plans</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <h3 className="font-semibold">Fitness Focus</h3>
                          <p className="text-sm text-neutral-600 mb-2">Unlimited gym access and fitness classes</p>
                          <p className="font-bold mb-2">$49<span className="text-sm font-normal text-neutral-600">/mo</span></p>
                          <Button variant="outline" size="sm" className="w-full">Upgrade</Button>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h3 className="font-semibold">Medical Plus</h3>
                          <p className="text-sm text-neutral-600 mb-2">Priority clinic appointments with discounts</p>
                          <p className="font-bold mb-2">$79<span className="text-sm font-normal text-neutral-600">/mo</span></p>
                          <Button variant="outline" size="sm" className="w-full">Upgrade</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/membership">
                      <a className="text-primary hover:underline text-sm">View all membership details →</a>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-neutral-50 px-4 py-3 border-b flex justify-between">
                          <div>
                            <p className="font-medium">Order #12345</p>
                            <p className="text-sm text-neutral-500">Placed on Oct 15, 2023</p>
                          </div>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full h-fit">
                            Delivered
                          </span>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center mb-4">
                            <div className="h-16 w-16 bg-neutral-100 rounded mr-4"></div>
                            <div>
                              <p className="font-medium">Organic Superfood Blend</p>
                              <p className="text-sm text-neutral-600">Quantity: 1</p>
                            </div>
                            <p className="ml-auto font-medium">$24.99</p>
                          </div>
                          <div className="flex items-center">
                            <div className="h-16 w-16 bg-neutral-100 rounded mr-4"></div>
                            <div>
                              <p className="font-medium">Cold-Pressed Juice Pack</p>
                              <p className="text-sm text-neutral-600">Quantity: 1</p>
                            </div>
                            <p className="ml-auto font-medium">$32.50</p>
                          </div>
                        </div>
                        <div className="bg-neutral-50 px-4 py-3 border-t flex justify-between">
                          <p className="font-medium">Total</p>
                          <p className="font-bold">$57.49</p>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-neutral-50 px-4 py-3 border-b flex justify-between">
                          <div>
                            <p className="font-medium">Order #12278</p>
                            <p className="text-sm text-neutral-500">Placed on Oct 2, 2023</p>
                          </div>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full h-fit">
                            Delivered
                          </span>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center">
                            <div className="h-16 w-16 bg-neutral-100 rounded mr-4"></div>
                            <div>
                              <p className="font-medium">Organic Berry Mix</p>
                              <p className="text-sm text-neutral-600">Quantity: 2</p>
                            </div>
                            <p className="ml-auto font-medium">$17.98</p>
                          </div>
                        </div>
                        <div className="bg-neutral-50 px-4 py-3 border-t flex justify-between">
                          <p className="font-medium">Total</p>
                          <p className="font-bold">$17.98</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/orders">
                      <a className="text-primary hover:underline text-sm">View order history →</a>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
