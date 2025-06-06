import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Calendar, Clock, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { clinicAppointments } from "@/lib/data";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM"
];

const specialists = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "General Practitioner" },
  { id: 2, name: "Dr. Michael Chen", specialty: "Nutritionist" },
  { id: 3, name: "Lisa Rodriguez, PT", specialty: "Physical Therapist" },
  { id: 4, name: "Dr. James Wilson", specialty: "Cardiologist" },
  { id: 5, name: "Dr. Emily Parker", specialty: "Dermatologist" },
  { id: 6, name: "Dr. David Thompson, DC", specialty: "Chiropractic Physician" },
  { id: 7, name: "Dr. Maria Santos, DC", specialty: "Chiropractic Physician" }
];

export default function Appointments() {
  const { toast } = useToast();
  const [appointmentType, setAppointmentType] = useState("clinic");
  const [selectedService, setSelectedService] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  // Fetch existing appointments
  const { data: appointmentsData, isLoading } = useQuery({
    queryKey: ['/api/appointments'],
    queryFn: async () => {
      try {
        const res = await apiRequest('GET', '/api/appointments');
        return res.json();
      } catch (error) {
        return { appointments: [] };
      }
    },
    enabled: !!userData?.user
  });

  // Book appointment mutation
  const bookAppointmentMutation = useMutation({
    mutationFn: async (appointmentData: any) => {
      const res = await apiRequest('POST', '/api/appointments', appointmentData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/appointments'] });
      setIsDialogOpen(false);
      toast({
        title: "Appointment booked",
        description: "Your appointment has been successfully scheduled.",
      });
      // Reset form
      setSelectedService("");
      setSelectedProvider("");
      setSelectedDate("");
      setSelectedTime("");
    },
    onError: () => {
      toast({
        title: "Booking failed",
        description: "There was a problem booking your appointment. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleBookAppointment = () => {
    if (!selectedService || !selectedProvider || !selectedDate || !selectedTime) {
      toast({
        title: "Incomplete form",
        description: "Please fill out all fields to book an appointment.",
        variant: "destructive",
      });
      return;
    }

    const providerName = specialists.find(s => s.id.toString() === selectedProvider)?.name || "";
    
    bookAppointmentMutation.mutate({
      serviceType: appointmentType,
      serviceName: selectedService,
      providerName,
      date: selectedDate,
      time: selectedTime,
      duration: 30, // Default duration
      status: "confirmed",
      appointmentType: "in-person" // Default to in-person appointments
    });
  };

  const isAuthenticated = !!userData?.user;
  const appointments = appointmentsData?.appointments || [];

  return (
    <>
      <Helmet>
        <title>Appointments | HealthHub</title>
        <meta name="description" content="Book and manage your medical appointments, fitness classes, and wellness consultations at HealthHub." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800">Appointments</h1>
          <p className="text-neutral-600">Schedule your visits across our integrated services</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - My Appointments */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card>
              <CardHeader>
                <CardTitle>My Appointments</CardTitle>
                <CardDescription>Your scheduled visits</CardDescription>
              </CardHeader>
              <CardContent>
                {!isAuthenticated ? (
                  <div className="text-center py-6">
                    <p className="text-neutral-600 mb-4">Please log in to view your appointments</p>
                    <Button asChild variant="outline">
                      <a href="/auth/login">Log In</a>
                    </Button>
                  </div>
                ) : isLoading ? (
                  <div className="text-center py-4">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-sm text-neutral-500 mt-2">Loading appointments...</p>
                  </div>
                ) : appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{appointment.serviceName}</h4>
                            <p className="text-sm text-neutral-600">{appointment.providerName}</p>
                          </div>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : appointment.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex text-sm text-neutral-500">
                          <div className="flex items-center mr-4">
                            <Calendar className="h-4 w-4 mr-1" />
                            {appointment.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {appointment.time}
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end space-x-2">
                          <Button size="sm" variant="outline">Reschedule</Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">Cancel</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Calendar className="h-12 w-12 mx-auto text-neutral-400 mb-2" />
                    <p className="text-neutral-600">You don't have any appointments</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Book Appointments */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Card>
              <CardHeader>
                <CardTitle>Book an Appointment</CardTitle>
                <CardDescription>Schedule a visit with our specialists</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="clinic" onValueChange={(value) => setAppointmentType(value)}>
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="clinic" className="flex-1">
                      <i className="ri-hospital-line mr-2"></i>
                      Medical Clinic
                    </TabsTrigger>
                    <TabsTrigger value="gym" className="flex-1">
                      <i className="ri-heart-pulse-line mr-2"></i>
                      Fitness Center
                    </TabsTrigger>
                    <TabsTrigger value="nutrition" className="flex-1">
                      <i className="ri-restaurant-line mr-2"></i>
                      Nutrition
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="clinic">
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium mb-4">Medical Services</h3>
                        
                        {/* Chiropractic Services Section */}
                        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-6 border border-blue-200">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="bg-blue-500 text-white p-2 rounded-lg">
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-xl font-semibold text-gray-900">Chiropractic Physician Services</h4>
                              <p className="text-gray-600">Specialized musculoskeletal care and spinal health treatments</p>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-lg p-4 border border-blue-100">
                              <h5 className="font-medium text-blue-800 mb-2">🦴 Spinal Adjustments</h5>
                              <p className="text-sm text-gray-600">Manual spinal manipulation to restore joint mobility and reduce pain</p>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-blue-100">
                              <h5 className="font-medium text-green-800 mb-2">💪 Soft Tissue Therapy</h5>
                              <p className="text-sm text-gray-600">Muscle and ligament treatment for improved flexibility and healing</p>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-blue-100">
                              <h5 className="font-medium text-purple-800 mb-2">⚡ Pain Management</h5>
                              <p className="text-sm text-gray-600">Comprehensive treatment plans for chronic and acute pain relief</p>
                            </div>
                          </div>
                        </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {clinicAppointments.map((appointment) => (
                        <div key={appointment.id} className="bg-neutral-100 rounded-lg p-6 hover:shadow-md transition">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-medium text-neutral-800">{appointment.title}</h4>
                              <p className="text-sm text-neutral-600">{appointment.provider}</p>
                            </div>
                            <span className="bg-primary-light/20 text-primary text-xs font-medium px-2 py-1 rounded">
                              {appointment.duration}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center text-neutral-600">
                              <i className="ri-calendar-line mr-2"></i>
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center text-neutral-600">
                              <i className="ri-time-line mr-2"></i>
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                className="w-full text-primary border-primary" 
                                onClick={() => {
                                  if (!isAuthenticated) {
                                    toast({
                                      title: "Authentication required",
                                      description: "Please log in to book an appointment.",
                                      variant: "destructive",
                                    });
                                    return;
                                  }
                                  setSelectedService(appointment.title);
                                  const providerId = specialists.find(s => s.name === appointment.provider)?.id.toString() || "";
                                  setSelectedProvider(providerId);
                                  setIsDialogOpen(true);
                                }}
                              >
                                Book Now
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Book Appointment</DialogTitle>
                                <DialogDescription>
                                  Complete the details below to schedule your appointment.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4 space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="service">Service</Label>
                                  <Select value={selectedService} onValueChange={setSelectedService}>
                                    <SelectTrigger id="service">
                                      <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {appointmentType === "clinic" && (
                                        <>
                                          <SelectItem value="General Consultation">General Consultation</SelectItem>
                                          <SelectItem value="Chiropractic Spinal Adjustment">Chiropractic Spinal Adjustment</SelectItem>
                                          <SelectItem value="Soft Tissue Therapy">Soft Tissue Therapy</SelectItem>
                                          <SelectItem value="Pain Management Consultation">Pain Management Consultation</SelectItem>
                                          <SelectItem value="Cardiology Checkup">Cardiology Checkup</SelectItem>
                                          <SelectItem value="Dermatology Consultation">Dermatology Consultation</SelectItem>
                                          <SelectItem value="Physical Therapy">Physical Therapy</SelectItem>
                                          <SelectItem value="Nutrition Counseling">Nutrition Counseling</SelectItem>
                                        </>
                                      )}
                                      {appointmentType === "gym" && (
                                        <>
                                          <SelectItem value="Personal Training Session">Personal Training Session</SelectItem>
                                          <SelectItem value="Fitness Assessment">Fitness Assessment</SelectItem>
                                          <SelectItem value="Group Class Consultation">Group Class Consultation</SelectItem>
                                          <SelectItem value="African Dance Class">African Dance Class</SelectItem>
                                          <SelectItem value="Strength Training">Strength Training</SelectItem>
                                        </>
                                      )}
                                      {appointmentType === "nutrition" && (
                                        <>
                                          <SelectItem value="Nutritional Assessment">Nutritional Assessment</SelectItem>
                                          <SelectItem value="Meal Planning Session">Meal Planning Session</SelectItem>
                                          <SelectItem value="Cultural Nutrition Counseling">Cultural Nutrition Counseling</SelectItem>
                                          <SelectItem value="Weight Management">Weight Management</SelectItem>
                                        </>
                                      )}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="provider">Provider</Label>
                                  <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                                    <SelectTrigger id="provider">
                                      <SelectValue placeholder="Select a provider" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {specialists.map((specialist) => (
                                        <SelectItem key={specialist.id} value={specialist.id.toString()}>
                                          {specialist.name} - {specialist.specialty}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="date">Date</Label>
                                  <Input 
                                    id="date" 
                                    type="date" 
                                    value={selectedDate} 
                                    onChange={(e) => setSelectedDate(e.target.value)} 
                                    min={format(new Date(), 'yyyy-MM-dd')}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Time</Label>
                                  <div className="grid grid-cols-3 gap-2">
                                    {timeSlots.slice(0, 6).map((time) => (
                                      <Button 
                                        key={time} 
                                        type="button" 
                                        variant={selectedTime === time ? "default" : "outline"}
                                        size="sm" 
                                        className="text-xs"
                                        onClick={() => setSelectedTime(time)}
                                      >
                                        {time}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button 
                                  type="button" 
                                  onClick={handleBookAppointment}
                                  disabled={!selectedService || !selectedProvider || !selectedDate || !selectedTime}
                                >
                                  Confirm Booking
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-medium mb-4">Chiropractic Treatment Options</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                      {["Spinal Adjustment", "Spinal Decompression", "Soft Tissue Therapy", "Postural Correction", "Sports Injury Care", "Pain Management"].map((service) => (
                        <Button 
                          key={service} 
                          variant="outline" 
                          className="justify-start bg-blue-50 border-blue-200 hover:bg-blue-100" 
                          onClick={() => {
                            if (!isAuthenticated) {
                              toast({
                                title: "Authentication required",
                                description: "Please log in to book an appointment.",
                                variant: "destructive",
                              });
                              return;
                            }
                            setSelectedService(service);
                            setIsDialogOpen(true);
                          }}
                        >
                          🦴 {service}
                        </Button>
                      ))}
                    </div>

                    <h3 className="text-lg font-medium mb-4">Other Medical Services</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["Annual Checkup", "Blood Work", "Cardiology", "Dermatology", "ENT Specialist", "Gynecology", "Mental Health", "Pediatrics"].map((service) => (
                        <Button 
                          key={service} 
                          variant="outline" 
                          className="justify-start" 
                          onClick={() => {
                            if (!isAuthenticated) {
                              toast({
                                title: "Authentication required",
                                description: "Please log in to book an appointment.",
                                variant: "destructive",
                              });
                              return;
                            }
                            setSelectedService(service);
                            setIsDialogOpen(true);
                          }}
                        >
                          {service}
                        </Button>
                      ))}
                    </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="gym">
                    <h3 className="text-lg font-medium mb-4">Fitness Assessment & Training</h3>
                    
                    <div className="space-y-6">
                      <div className="bg-neutral-50 rounded-lg p-6">
                        <h4 className="font-medium mb-4">Choose Your Service</h4>
                        <RadioGroup defaultValue="fitness-assessment">
                          <div className="flex items-start space-x-2 mb-4">
                            <RadioGroupItem value="fitness-assessment" id="fitness-assessment" />
                            <div className="grid gap-1.5">
                              <Label htmlFor="fitness-assessment" className="font-medium">Fitness Assessment</Label>
                              <p className="text-sm text-neutral-600">
                                Comprehensive evaluation of your current fitness level and goals
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2 mb-4">
                            <RadioGroupItem value="personal-training" id="personal-training" />
                            <div className="grid gap-1.5">
                              <Label htmlFor="personal-training" className="font-medium">Personal Training Session</Label>
                              <p className="text-sm text-neutral-600">
                                One-on-one workout with a certified personal trainer
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <RadioGroupItem value="nutrition-consultation" id="nutrition-consultation" />
                            <div className="grid gap-1.5">
                              <Label htmlFor="nutrition-consultation" className="font-medium">Nutrition Consultation</Label>
                              <p className="text-sm text-neutral-600">
                                Personalized nutrition plan aligned with your fitness goals
                              </p>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-medium">Select Trainer</h4>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a trainer" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="marcus">Marcus Johnson - HIIT Specialist</SelectItem>
                              <SelectItem value="emma">Emma Taylor - Yoga Instructor</SelectItem>
                              <SelectItem value="david">David Kim - Strength Coach</SelectItem>
                              <SelectItem value="alexis">Alexis Rivera - Cardio Expert</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium">Date & Time</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="gym-date">Date</Label>
                              <Input 
                                id="gym-date" 
                                type="date" 
                                min={format(new Date(), 'yyyy-MM-dd')}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="gym-time">Time</Label>
                              <Select>
                                <SelectTrigger id="gym-time">
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"].map((time) => (
                                    <SelectItem key={time} value={time}>{time}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full"
                        onClick={() => {
                          if (!isAuthenticated) {
                            toast({
                              title: "Authentication required",
                              description: "Please log in to book an appointment.",
                              variant: "destructive",
                            });
                            return;
                          }
                          toast({
                            title: "Booking submitted",
                            description: "Your fitness appointment request has been received.",
                          });
                        }}
                      >
                        Book Session
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="nutrition">
                    <h3 className="text-lg font-medium mb-4">Nutrition Services</h3>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-neutral-100 rounded-lg p-6 hover:shadow-md transition">
                          <div className="flex items-center mb-4">
                            <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                              <i className="ri-restaurant-line text-xl text-accent"></i>
                            </div>
                            <div className="ml-4">
                              <h4 className="font-medium">Personalized Meal Planning</h4>
                              <p className="text-sm text-neutral-600">60-minute consultation</p>
                            </div>
                          </div>
                          <p className="text-neutral-600 mb-4 text-sm">
                            Work with our nutrition experts to create a customized meal plan based on your health goals, preferences, and lifestyle.
                          </p>
                          <Button 
                            variant="outline" 
                            className="w-full text-accent border-accent"
                            onClick={() => {
                              if (!isAuthenticated) {
                                toast({
                                  title: "Authentication required",
                                  description: "Please log in to book an appointment.",
                                  variant: "destructive",
                                });
                                return;
                              }
                              setSelectedService("Personalized Meal Planning");
                              setIsDialogOpen(true);
                            }}
                          >
                            Book Consultation
                          </Button>
                        </div>
                        
                        <div className="bg-neutral-100 rounded-lg p-6 hover:shadow-md transition">
                          <div className="flex items-center mb-4">
                            <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                              <i className="ri-restaurant-line text-xl text-accent"></i>
                            </div>
                            <div className="ml-4">
                              <h4 className="font-medium">Dietary Assessment</h4>
                              <p className="text-sm text-neutral-600">45-minute consultation</p>
                            </div>
                          </div>
                          <p className="text-neutral-600 mb-4 text-sm">
                            Comprehensive evaluation of your current eating habits with personalized recommendations for improvement.
                          </p>
                          <Button 
                            variant="outline" 
                            className="w-full text-accent border-accent"
                            onClick={() => {
                              if (!isAuthenticated) {
                                toast({
                                  title: "Authentication required",
                                  description: "Please log in to book an appointment.",
                                  variant: "destructive",
                                });
                                return;
                              }
                              setSelectedService("Dietary Assessment");
                              setIsDialogOpen(true);
                            }}
                          >
                            Book Consultation
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-neutral-50 rounded-lg p-6">
                        <h4 className="font-medium mb-4">Nutritional Specialists</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-center p-3 bg-white rounded-lg">
                            <div className="h-12 w-12 bg-neutral-200 rounded-full mr-4"></div>
                            <div>
                              <p className="font-medium">Dr. Michael Chen</p>
                              <p className="text-sm text-neutral-600">Sports Nutrition</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-white rounded-lg">
                            <div className="h-12 w-12 bg-neutral-200 rounded-full mr-4"></div>
                            <div>
                              <p className="font-medium">Maria Rodriguez, RD</p>
                              <p className="text-sm text-neutral-600">Clinical Dietitian</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-white rounded-lg">
                            <div className="h-12 w-12 bg-neutral-200 rounded-full mr-4"></div>
                            <div>
                              <p className="font-medium">Dr. Jennifer Park</p>
                              <p className="text-sm text-neutral-600">Weight Management</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-white rounded-lg">
                            <div className="h-12 w-12 bg-neutral-200 rounded-full mr-4"></div>
                            <div>
                              <p className="font-medium">Robert Thompson, RD</p>
                              <p className="text-sm text-neutral-600">Functional Nutrition</p>
                            </div>
                          </div>
                        </div>
                      </div>
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
