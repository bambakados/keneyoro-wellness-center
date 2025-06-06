import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  Video, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Clock, 
  Star,
  Award,
  Languages,
  GraduationCap
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/utils";

export default function Telehealth() {
  const { toast } = useToast();
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [bookingDialog, setBookingDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<string>("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [consultationType, setConsultationType] = useState("video");
  const [notes, setNotes] = useState("");

  // Check if user is authenticated
  const { data: authData } = useQuery({
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

  const isAuthenticated = authData?.user;

  // Book appointment mutation
  const bookAppointmentMutation = useMutation({
    mutationFn: async (appointmentData: any) => {
      const res = await apiRequest('POST', '/api/appointments', appointmentData);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Appointment Booked!",
        description: "Your telehealth consultation has been scheduled successfully.",
      });
      setBookingDialog(false);
      // Reset form
      setSelectedDoctor(null);
      setSelectedAssessment("");
      setAppointmentDate("");
      setAppointmentTime("");
      setNotes("");
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "Unable to book appointment. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Sample telehealth doctors data - in production this would come from your API
  const telehealthDoctors = [
    {
      id: 1,
      fullName: "Dr. Amina Hassan",
      specialty: "Family Medicine",
      experience: 12,
      rating: 5,
      consultationFee: 7500, // $75 in cents
      languages: ["English", "Arabic", "French"],
      education: "MD, Johns Hopkins University",
      bio: "Specializing in comprehensive family care with 12+ years experience in telemedicine.",
      profileImage: null,
      availableToday: true
    },
    {
      id: 2,
      fullName: "Dr. Kwame Asante",
      specialty: "Cardiology",
      experience: 15,
      rating: 5,
      consultationFee: 12500, // $125 in cents
      languages: ["English", "Twi", "French"],
      education: "MD, Harvard Medical School",
      bio: "Board-certified cardiologist with expertise in preventive heart care and hypertension management.",
      profileImage: null,
      availableToday: true
    },
    {
      id: 3,
      fullName: "Dr. Fatou Diallo",
      specialty: "Mental Health",
      experience: 8,
      rating: 5,
      consultationFee: 9500, // $95 in cents
      languages: ["English", "French", "Mandingo"],
      education: "MD, Psychiatry, Stanford University",
      bio: "Compassionate mental health specialist focusing on anxiety, depression, and cultural therapy approaches.",
      profileImage: null,
      availableToday: false
    },
    {
      id: 4,
      fullName: "Dr. Ibrahim Kone",
      specialty: "Pediatrics",
      experience: 10,
      rating: 5,
      consultationFee: 8500, // $85 in cents
      languages: ["English", "French", "Bambara"],
      education: "MD, Pediatrics, University of Pennsylvania",
      bio: "Dedicated pediatrician with extensive experience in child healthcare and development.",
      profileImage: null,
      availableToday: true
    }
  ];

  const specialties = [
    { value: "all", label: "All Specialties" },
    { value: "family", label: "Family Medicine" },
    { value: "cardiology", label: "Cardiology" },
    { value: "mental", label: "Mental Health" },
    { value: "pediatrics", label: "Pediatrics" },
    { value: "dermatology", label: "Dermatology" },
    { value: "neurology", label: "Neurology" }
  ];

  const consultationTypes = [
    {
      type: "video",
      icon: Video,
      title: "Video Consultation",
      description: "Face-to-face consultation via secure video call",
      duration: "30-45 minutes",
      recommended: true
    },
    {
      type: "phone",
      icon: Phone,
      title: "Phone Consultation",
      description: "Voice-only consultation via phone call",
      duration: "20-30 minutes",
      recommended: false
    },
    {
      type: "chat",
      icon: MessageSquare,
      title: "Secure Chat",
      description: "Text-based consultation with file sharing",
      duration: "Available 24/7",
      recommended: false
    }
  ];

  const filteredDoctors = selectedSpecialty === "all" 
    ? telehealthDoctors 
    : telehealthDoctors.filter(doctor => 
        doctor.specialty.toLowerCase().includes(selectedSpecialty)
      );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleBookConsultation = (doctor: any) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to book a consultation.",
        variant: "destructive",
      });
      return;
    }
    setSelectedDoctor(doctor);
    setBookingDialog(true);
  };

  const handleBookAssessment = (assessmentType: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to book a health assessment.",
        variant: "destructive",
      });
      return;
    }
    setSelectedAssessment(assessmentType);
    setBookingDialog(true);
  };

  const handleSubmitBooking = () => {
    if (!appointmentDate || !appointmentTime) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for your appointment.",
        variant: "destructive",
      });
      return;
    }

    const appointmentData = {
      date: appointmentDate,
      time: appointmentTime,
      serviceType: selectedDoctor ? "telehealth" : "health-assessment",
      serviceName: selectedDoctor ? `${consultationType} consultation` : selectedAssessment,
      providerName: selectedDoctor ? selectedDoctor.fullName : "KeneYoro Health Team",
      appointmentType: consultationType,
      duration: selectedDoctor ? 45 : 120, // 45 min for consultations, 2 hours for assessments
      notes: notes,
      meetingLink: consultationType === "video" ? "https://meet.keneyoro.com/join" : null
    };

    bookAppointmentMutation.mutate(appointmentData);
  };

  return (
    <>
      <Helmet>
        <title>Telehealth Services | KeneYoro</title>
        <meta name="description" content="Access quality healthcare from home with KeneYoro's telehealth services. Video consultations with licensed doctors available 24/7." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">
            Telehealth Services
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Connect with licensed healthcare providers from the comfort of your home. 
            Quality medical care when and where you need it.
          </p>
        </div>

        <Tabs defaultValue="book" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="book">Book Consultation</TabsTrigger>
            <TabsTrigger value="doctors">Our Doctors</TabsTrigger>
            <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
          </TabsList>

          <TabsContent value="book" className="space-y-8">
            {/* Consultation Types */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {consultationTypes.map((consultation) => {
                const IconComponent = consultation.icon;
                return (
                  <Card key={consultation.type} className={`relative ${consultation.recommended ? 'ring-2 ring-primary' : ''}`}>
                    {consultation.recommended && (
                      <Badge className="absolute -top-2 left-4 bg-primary text-white">
                        Recommended
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{consultation.title}</CardTitle>
                      <CardDescription>{consultation.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-neutral-600 mb-4">Duration: {consultation.duration}</p>
                      <Button className="w-full">
                        Select {consultation.title}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Book Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Quick Book Appointment
                </CardTitle>
                <CardDescription>
                  Select your preferred specialty and get matched with available doctors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Specialty</label>
                    <select 
                      className="w-full p-3 border border-neutral-300 rounded-lg"
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                    >
                      {specialties.map(specialty => (
                        <option key={specialty.value} value={specialty.value}>
                          {specialty.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Time</label>
                    <select className="w-full p-3 border border-neutral-300 rounded-lg">
                      <option>Next Available</option>
                      <option>This Morning</option>
                      <option>This Afternoon</option>
                      <option>This Evening</option>
                      <option>Tomorrow</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full mt-4" size="lg">
                  Find Available Doctors
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doctors" className="space-y-6">
            {/* Specialty Filter */}
            <div className="flex flex-wrap gap-2">
              {specialties.map(specialty => (
                <Button
                  key={specialty.value}
                  variant={selectedSpecialty === specialty.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSpecialty(specialty.value)}
                >
                  {specialty.label}
                </Button>
              ))}
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="h-full">
                  <CardHeader className="text-center">
                    <Avatar className="h-20 w-20 mx-auto mb-4">
                      <AvatarImage src={doctor.profileImage || undefined} />
                      <AvatarFallback className="text-lg">
                        {getInitials(doctor.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{doctor.fullName}</CardTitle>
                    <CardDescription>{doctor.specialty}</CardDescription>
                    <div className="flex items-center justify-center gap-1">
                      {Array.from({ length: doctor.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-sm text-neutral-600 ml-1">({doctor.rating}.0)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-neutral-600" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="h-4 w-4 text-neutral-600" />
                      <span className="text-xs">{doctor.education}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Languages className="h-4 w-4 text-neutral-600" />
                      <span className="text-xs">{doctor.languages.join(", ")}</span>
                    </div>
                    <p className="text-sm text-neutral-600">{doctor.bio}</p>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-lg font-semibold">{formatPrice(doctor.consultationFee)}</p>
                        <p className="text-xs text-neutral-600">per consultation</p>
                      </div>
                      <div className="text-right">
                        {doctor.availableToday ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Available Today
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            Next: Tomorrow
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleBookConsultation(doctor)}
                    >
                      Book Consultation
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="how-it-works" className="space-y-8">
            {/* Advanced Health Assessments Section */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Advanced Health & Wellness Assessments</CardTitle>
                <CardDescription className="text-center text-lg">
                  Comprehensive diagnostic testing and analysis for optimal health monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center p-4 border border-neutral-200 rounded-lg">
                    <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">Advanced Bloodwork</h4>
                    <p className="text-sm text-neutral-600">Analysis of 120+ biomarkers covering microbiome, epigenetics, biological age, metabolic, hormonal, cellular health, and inflammation.</p>
                  </div>

                  <div className="text-center p-4 border border-neutral-200 rounded-lg">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">Body Composition Scans</h4>
                    <p className="text-sm text-neutral-600">Comprehensive assessments to evaluate muscle mass, fat distribution, and bone density for optimal body health.</p>
                  </div>

                  <div className="text-center p-4 border border-neutral-200 rounded-lg">
                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">VO2 Max & Fitness Testing</h4>
                    <p className="text-sm text-neutral-600">Advanced cardiovascular fitness measurements and musculoskeletal function assessments.</p>
                  </div>

                  <div className="text-center p-4 border border-neutral-200 rounded-lg">
                    <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">Continuous Glucose Monitoring</h4>
                    <p className="text-sm text-neutral-600">Real-time blood sugar tracking for metabolic health optimization and diabetes prevention.</p>
                  </div>

                  <div className="text-center p-4 border border-neutral-200 rounded-lg">
                    <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">Longevity Screenings</h4>
                    <p className="text-sm text-neutral-600">Cardiac risk assessments and comprehensive longevity evaluations for long-term health planning.</p>
                  </div>

                  <div className="text-center p-4 border border-neutral-200 rounded-lg">
                    <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="h-6 w-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-2">Comprehensive Lab Panels</h4>
                    <p className="text-sm text-neutral-600">Complete Blood Count, Metabolic Panel, Lipid Panel, Vitamin D, B12, Omega Check, and specialized hormone testing.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Assessment Bundles */}
            <Card>
              <CardHeader>
                <CardTitle>Specialized Health Assessment Bundles</CardTitle>
                <CardDescription>Choose from our three comprehensive assessment packages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border border-neutral-200 rounded-lg p-6">
                    <div className="text-center mb-4">
                      <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold">Heart Health Assessment</h3>
                    </div>
                    <ul className="text-sm text-neutral-600 space-y-2 mb-6">
                      <li>• Lipid Panel & Apolipoprotein B</li>
                      <li>• Lipoprotein (a) Analysis</li>
                      <li>• HS CRP Inflammation Markers</li>
                      <li>• Cardiac Risk Screening</li>
                      <li>• Physician Review & Plan</li>
                    </ul>
                    <Button 
                      className="w-full"
                      onClick={() => handleBookAssessment("Heart Health Assessment")}
                    >
                      Book Heart Assessment
                    </Button>
                  </div>

                  <div className="border border-neutral-200 rounded-lg p-6">
                    <div className="text-center mb-4">
                      <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold">Metabolic Health Assessment</h3>
                    </div>
                    <ul className="text-sm text-neutral-600 space-y-2 mb-6">
                      <li>• Glucose & Hemoglobin A1c</li>
                      <li>• C-Peptide Analysis</li>
                      <li>• Comprehensive Metabolic Panel</li>
                      <li>• Continuous Glucose Monitoring</li>
                      <li>• Metabolic Optimization Plan</li>
                    </ul>
                    <Button 
                      className="w-full"
                      onClick={() => handleBookAssessment("Metabolic Health Assessment")}
                    >
                      Book Metabolic Assessment
                    </Button>
                  </div>

                  <div className="border border-neutral-200 rounded-lg p-6">
                    <div className="text-center mb-4">
                      <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold">Complete Wellness Assessment</h3>
                    </div>
                    <ul className="text-sm text-neutral-600 space-y-2 mb-6">
                      <li>• 120+ Biomarker Analysis</li>
                      <li>• Vitamin D, B12 & Omega Check</li>
                      <li>• TSH + Free T4 Thyroid Panel</li>
                      <li>• Body Composition Scan</li>
                      <li>• Comprehensive Wellness Plan</li>
                    </ul>
                    <Button 
                      className="w-full"
                      onClick={() => handleBookAssessment("Complete Wellness Assessment")}
                    >
                      Book Complete Assessment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mx-auto h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Book Your Appointment</h3>
                <p className="text-neutral-600">
                  Choose your preferred doctor, specialty, and consultation type. 
                  Schedule at your convenience.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Video className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Join Your Consultation</h3>
                <p className="text-neutral-600">
                  Connect via secure video, phone, or chat. 
                  No additional software needed - works in your browser.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Receive Your Care Plan</h3>
                <p className="text-neutral-600">
                  Get prescriptions, treatment plans, and follow-up care recommendations 
                  directly through the platform.
                </p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Benefits of KeneYoro Telehealth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">🏠 Convenient Care</h4>
                    <p className="text-sm text-neutral-600">Access healthcare from home, work, or anywhere with internet connection.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">⚡ Fast Access</h4>
                    <p className="text-sm text-neutral-600">Same-day appointments available with many specialists.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">💰 Affordable</h4>
                    <p className="text-sm text-neutral-600">Lower cost than traditional office visits, with transparent pricing.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">🔒 Secure & Private</h4>
                    <p className="text-sm text-neutral-600">HIPAA-compliant platform with end-to-end encryption.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">🌍 Cultural Competency</h4>
                    <p className="text-sm text-neutral-600">Doctors who understand diverse cultural backgrounds and speak multiple languages.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">📱 Mobile Friendly</h4>
                    <p className="text-sm text-neutral-600">Works seamlessly on smartphones, tablets, and computers.</p>
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