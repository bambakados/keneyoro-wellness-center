import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Calendar, Clock, User, Users, Search, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const days = ["Today", "Tomorrow", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Classes() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Fetch user data
  const { data: userData } = useQuery({
    queryKey: ['/api/auth/me'],
    queryFn: async () => {
      try {
        const res = await apiRequest('GET', '/api/auth/me');
        return res.json();
      } catch (error) {
        return { user: null };
      }
    }
  });

  // Fetch fitness classes
  const { data: classesData, isLoading } = useQuery({
    queryKey: ['/api/fitness-classes'],
    queryFn: async () => {
      const res = await fetch('/api/fitness-classes');
      if (!res.ok) throw new Error('Failed to fetch fitness classes');
      return res.json();
    }
  });

  // Fetch user registrations
  const { data: registrationsData, isLoading: registrationsLoading } = useQuery({
    queryKey: ['/api/class-registrations'],
    queryFn: async () => {
      try {
        const res = await apiRequest('GET', '/api/fitness-classes/registrations');
        return res.json();
      } catch (error) {
        return { registrations: [] };
      }
    },
    enabled: !!userData?.user
  });

  // Register for class mutation
  const registerClassMutation = useMutation({
    mutationFn: async (classId: number) => {
      const res = await apiRequest('POST', `/api/fitness-classes/${classId}/register`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/fitness-classes'] });
      queryClient.invalidateQueries({ queryKey: ['/api/class-registrations'] });
      setRegistrationSuccess(true);
      setTimeout(() => {
        setIsDialogOpen(false);
        setRegistrationSuccess(false);
      }, 2000);
    },
    onError: () => {
      toast({
        title: "Registration failed",
        description: "There was a problem registering for this class. Please try again.",
        variant: "destructive",
      });
    }
  });

  const isAuthenticated = !!userData?.user;
  const classes = classesData?.classes || [];
  const userRegistrations = registrationsData?.registrations || [];

  // Filter classes based on search and day
  const filteredClasses = classes.filter((fitnessClass: any) => {
    const matchesSearch = searchQuery === "" || 
      fitnessClass.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fitnessClass.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fitnessClass.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDay = selectedDay === null || fitnessClass.day === selectedDay;
    
    return matchesSearch && matchesDay;
  });

  // Group classes by day
  const classesByDay = filteredClasses.reduce((acc: any, fitnessClass: any) => {
    if (!acc[fitnessClass.day]) {
      acc[fitnessClass.day] = [];
    }
    acc[fitnessClass.day].push(fitnessClass);
    return acc;
  }, {});

  const handleRegisterClass = () => {
    if (!selectedClass) return;
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to register for classes.",
        variant: "destructive",
      });
      return;
    }
    
    registerClassMutation.mutate(selectedClass.id);
  };

  return (
    <>
      <Helmet>
        <title>Fitness Classes | HealthHub</title>
        <meta name="description" content="Browse and book fitness classes at HealthHub including yoga, HIIT, strength training, and specialized fitness programs." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800">Fitness Classes</h1>
          <p className="text-neutral-600">Browse and book classes to support your fitness journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters & My Classes */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Filter Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-neutral-500" />
                      <Input
                        placeholder="Search classes or instructors"
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Day</Label>
                      <Select value={selectedDay || "all"} onValueChange={(value) => setSelectedDay(value === "all" ? null : value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="All days" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All days</SelectItem>
                          {days.map((day) => (
                            <SelectItem key={day} value={day}>{day}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Class Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="All types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All types</SelectItem>
                          <SelectItem value="yoga">Yoga</SelectItem>
                          <SelectItem value="hiit">HIIT</SelectItem>
                          <SelectItem value="strength">Strength Training</SelectItem>
                          <SelectItem value="cardio">Cardio</SelectItem>
                          <SelectItem value="pilates">Pilates</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Any duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any duration</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedDay(null);
                      }}
                    >
                      <Filter className="h-4 w-4 mr-2" /> Reset Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {isAuthenticated && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">My Classes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {registrationsLoading ? (
                      <div className="text-center py-4">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-sm text-neutral-500 mt-2">Loading your classes...</p>
                      </div>
                    ) : userRegistrations.length > 0 ? (
                      <div className="space-y-3">
                        {userRegistrations.map((registration: any) => {
                          const classInfo = classes.find((c: any) => c.id === registration.classId);
                          if (!classInfo) return null;
                          
                          return (
                            <div key={registration.id} className="bg-neutral-50 rounded-lg p-3">
                              <p className="font-medium">{classInfo.className}</p>
                              <p className="text-sm text-neutral-600">{classInfo.instructor}</p>
                              <div className="flex text-xs text-neutral-500 mt-1">
                                <div className="flex items-center mr-3">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {classInfo.day}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {classInfo.time}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <Users className="h-10 w-10 mx-auto text-neutral-400 mb-2" />
                        <p className="text-neutral-600">You haven't registered for any classes yet</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Main Content - Classes Schedule */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Class Schedule</CardTitle>
                <CardDescription>Browse and book your favorite classes</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="list" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="list">List View</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="list">
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-neutral-600 mt-4">Loading classes...</p>
                    </div>
                  ) : filteredClasses.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="h-12 w-12 mx-auto text-neutral-400 mb-2" />
                      <p className="text-neutral-600">No classes found matching your filters</p>
                      <Button 
                        variant="outline" 
                        className="mt-4" 
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedDay(null);
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {Object.keys(classesByDay).sort((a, b) => {
                        // Sort with Today first, Tomorrow second, then alphabetically
                        if (a === "Today") return -1;
                        if (b === "Today") return 1;
                        if (a === "Tomorrow") return -1;
                        if (b === "Tomorrow") return 1;
                        return a.localeCompare(b);
                      }).map((day) => (
                        <div key={day}>
                          <h3 className="text-lg font-medium mb-4 flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-primary" />
                            {day}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {classesByDay[day].sort((a: any, b: any) => {
                              // Convert time to comparable format
                              const getTime = (timeStr: string) => {
                                const [time, period] = timeStr.split(' ');
                                let [hours, minutes] = time.split(':').map(Number);
                                if (period === 'PM' && hours !== 12) hours += 12;
                                if (period === 'AM' && hours === 12) hours = 0;
                                return hours * 60 + (minutes || 0);
                              };
                              
                              return getTime(a.time) - getTime(b.time);
                            }).map((fitnessClass: any) => (
                              <div key={fitnessClass.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition">
                                <div className="relative">
                                  {fitnessClass.imageUrl && (
                                    <img 
                                      src={fitnessClass.imageUrl} 
                                      alt={fitnessClass.className} 
                                      className="w-full h-36 object-cover"
                                    />
                                  )}
                                  <div className="absolute top-2 right-2">
                                    <Badge variant="secondary">{fitnessClass.duration} min</Badge>
                                  </div>
                                </div>
                                <div className="p-4">
                                  <h4 className="font-medium text-lg">{fitnessClass.className}</h4>
                                  <p className="text-sm text-neutral-600 flex items-center mt-1">
                                    <User className="h-4 w-4 mr-1" /> {fitnessClass.instructor}
                                  </p>
                                  <div className="flex items-center text-sm text-neutral-500 mt-2">
                                    <Clock className="h-4 w-4 mr-1" /> {fitnessClass.time}
                                  </div>
                                  <p className="text-sm text-neutral-600 mt-2 line-clamp-2">{fitnessClass.description}</p>
                                  
                                  <div className="mt-3">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-xs text-neutral-500">
                                        {fitnessClass.capacity - fitnessClass.currentRegistered} spots left
                                      </span>
                                      <span className="text-xs text-neutral-500">
                                        {fitnessClass.currentRegistered}/{fitnessClass.capacity}
                                      </span>
                                    </div>
                                    <Progress 
                                      value={(fitnessClass.currentRegistered / fitnessClass.capacity) * 100} 
                                      className="h-1" 
                                    />
                                  </div>
                                  
                                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                      <Button 
                                        className="w-full mt-4" 
                                        disabled={fitnessClass.currentRegistered >= fitnessClass.capacity}
                                        onClick={() => setSelectedClass(fitnessClass)}
                                      >
                                        {fitnessClass.currentRegistered >= fitnessClass.capacity 
                                          ? "Class Full" 
                                          : "Reserve Spot"}
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                      {!registrationSuccess ? (
                                        <>
                                          <DialogHeader>
                                            <DialogTitle>Reserve Class Spot</DialogTitle>
                                            <DialogDescription>
                                              Confirm your spot in this fitness class.
                                            </DialogDescription>
                                          </DialogHeader>
                                          <div className="py-4">
                                            <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
                                              <h3 className="font-medium">{selectedClass?.className}</h3>
                                              <p className="text-sm text-neutral-600">{selectedClass?.instructor}</p>
                                              <div className="flex text-sm text-neutral-500 mt-2">
                                                <div className="flex items-center mr-4">
                                                  <Calendar className="h-4 w-4 mr-1" />
                                                  {selectedClass?.day}
                                                </div>
                                                <div className="flex items-center">
                                                  <Clock className="h-4 w-4 mr-1" />
                                                  {selectedClass?.time}
                                                </div>
                                              </div>
                                            </div>
                                            
                                            <p className="text-sm text-neutral-600">
                                              Please arrive 10 minutes before the class starts. 
                                              Bring appropriate workout clothing and a water bottle.
                                            </p>
                                            
                                            {!isAuthenticated && (
                                              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                <p className="text-sm text-yellow-800">
                                                  You need to be logged in to reserve a spot.
                                                </p>
                                              </div>
                                            )}
                                          </div>
                                          <DialogFooter>
                                            <Button 
                                              variant="outline" 
                                              onClick={() => setIsDialogOpen(false)}
                                            >
                                              Cancel
                                            </Button>
                                            <Button 
                                              onClick={handleRegisterClass}
                                              disabled={!isAuthenticated || registerClassMutation.isPending}
                                            >
                                              {registerClassMutation.isPending ? (
                                                <>
                                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                  Reserving...
                                                </>
                                              ) : (
                                                "Confirm Reservation"
                                              )}
                                            </Button>
                                          </DialogFooter>
                                        </>
                                      ) : (
                                        <div className="py-8 text-center">
                                          <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                          </div>
                                          <h3 className="text-lg font-medium mb-2">Reservation Confirmed!</h3>
                                          <p className="text-neutral-600">Your spot has been successfully reserved.</p>
                                        </div>
                                      )}
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="calendar" className="mt-0">
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-neutral-400 mb-2" />
                    <p className="text-neutral-600">Calendar view coming soon</p>
                    <p className="text-sm text-neutral-500">Please use the list view for now</p>
                  </div>
                </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
