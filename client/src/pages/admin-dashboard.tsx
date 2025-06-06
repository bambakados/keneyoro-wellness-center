import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Settings, 
  Users, 
  Calendar,
  DollarSign,
  Clock,
  FileText,
  TrendingUp,
  Shield,
  Database,
  Bell,
  Edit,
  Trash2,
  Plus,
  Save,
  Download,
  Upload,
  Eye,
  BarChart3
} from "lucide-react";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Check if user is admin (you'll need to implement admin role checking)
  const { data: userData } = useQuery({
    queryKey: ['/api/auth/me'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/auth/me');
      return res.json();
    }
  });

  // Fetch admin dashboard data
  const { data: dashboardData } = useQuery({
    queryKey: ['/api/admin/dashboard'],
    queryFn: async () => {
      // Mock data for now - you can connect to real admin endpoints
      return {
        overview: {
          totalUsers: 247,
          todayAppointments: 18,
          monthlyRevenue: 24847,
          activePrograms: 12,
          systemHealth: "excellent"
        },
        recentActivity: [
          { id: 1, type: "appointment", description: "New booking for Chiropractic session", time: "2 minutes ago" },
          { id: 2, type: "user", description: "New user registration: Sarah M.", time: "15 minutes ago" },
          { id: 3, type: "payment", description: "Payment received: $85 for Personal Training", time: "1 hour ago" },
          { id: 4, type: "program", description: "Guinea Healing Workshop enrollment", time: "2 hours ago" }
        ]
      };
    }
  });

  // Business Settings Management
  const [businessSettings, setBusinessSettings] = useState({
    businessName: "KeneYoro Wellness Center",
    address: "10 Mill Street, Mount Holly, NJ 08060",
    phone: "(267) 401-3733",
    email: "ibamba@bambafamilyllc.com",
    website: "www.bambafamilyllc.com",
    businessHours: {
      monday: "8:00 AM - 8:00 PM",
      tuesday: "8:00 AM - 8:00 PM",
      wednesday: "8:00 AM - 8:00 PM",
      thursday: "8:00 AM - 8:00 PM",
      friday: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 5:00 PM",
      sunday: "10:00 AM - 4:00 PM"
    },
    bookingSettings: {
      advanceBookingDays: 30,
      cancellationHours: 24,
      appointmentDuration: 30,
      bufferTime: 15
    }
  });

  // Service Management
  const [services, setServices] = useState([
    { id: 1, name: "General Consultation", category: "clinic", price: 95, duration: 30, active: true },
    { id: 2, name: "Chiropractic Adjustment", category: "clinic", price: 85, duration: 45, active: true },
    { id: 3, name: "Personal Training", category: "gym", price: 75, duration: 60, active: true },
    { id: 4, name: "Nutrition Counseling", category: "nutrition", price: 80, duration: 45, active: true },
    { id: 5, name: "African Dance Class", category: "gym", price: 25, duration: 60, active: true },
    { id: 6, name: "Guinea Healing Workshop", category: "cultural", price: 180, duration: 120, active: true }
  ]);

  // Staff Management
  const [staff, setStaff] = useState([
    { id: 1, name: "Dr. Sarah Johnson", role: "General Practitioner", email: "sarah@keneyoro.com", active: true, schedule: "Full-time" },
    { id: 2, name: "Dr. Michael Chen", role: "Nutritionist", email: "michael@keneyoro.com", active: true, schedule: "Full-time" },
    { id: 3, name: "Lisa Rodriguez, PT", role: "Physical Therapist", email: "lisa@keneyoro.com", active: true, schedule: "Part-time" },
    { id: 4, name: "Elder Mamadou Diallo", role: "Traditional Healer", email: "mamadou@keneyoro.com", active: true, schedule: "Contract" }
  ]);

  // Content Management
  const [websiteContent, setWebsiteContent] = useState({
    heroTitle: "KeneYoro Wellness Center",
    heroSubtitle: "Where traditional Guinea healing meets modern wellness",
    aboutText: "Founded by Ibrahim Bamba, KeneYoro combines authentic African healing traditions with cutting-edge healthcare technology.",
    missionStatement: "To provide holistic wellness solutions that honor cultural heritage while embracing modern medical practices.",
    announcements: [
      { id: 1, title: "New Guinea Heritage Month Programs", content: "Celebrating our roots with special cultural wellness offerings", active: true },
      { id: 2, title: "Telehealth Services Now Available", content: "Book virtual consultations with our expert practitioners", active: true }
    ]
  });

  const saveBusinessSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Business settings have been updated successfully.",
    });
  };

  const handleServiceEdit = (service: any) => {
    setEditingItem(service);
    setIsEditDialogOpen(true);
  };

  const handleServiceSave = () => {
    if (editingItem) {
      setServices(services.map(s => s.id === editingItem.id ? editingItem : s));
      toast({
        title: "Service Updated",
        description: "Service details have been saved successfully.",
      });
    }
    setIsEditDialogOpen(false);
    setEditingItem(null);
  };

  const exportData = () => {
    const exportData = {
      businessSettings,
      services,
      staff,
      websiteContent,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `keneyoro-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    toast({
      title: "Data Exported",
      description: "Your business data has been successfully exported.",
    });
  };

  if (!userData?.user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Shield className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h1>
          <p className="text-gray-600">Please log in to access the admin dashboard.</p>
          <Button asChild className="mt-4">
            <a href="/auth/login">Log In</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - KeneYoro Wellness Center</title>
        <meta name="description" content="Complete administrative control panel for managing your KeneYoro wellness center operations, staff, services, and content." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🎛️ Admin Dashboard
            </h1>
            <p className="text-gray-600">Complete control over your KeneYoro wellness center</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={exportData} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Import Data
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{dashboardData?.overview.totalUsers || 247}</div>
              <p className="text-xs text-blue-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{dashboardData?.overview.todayAppointments || 18}</div>
              <p className="text-xs text-green-600">3 more than yesterday</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">${dashboardData?.overview.monthlyRevenue?.toLocaleString() || "24,847"}</div>
              <p className="text-xs text-purple-600">+8% growth</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">{dashboardData?.overview.activePrograms || 12}</div>
              <p className="text-xs text-orange-600">Cultural & wellness</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <BarChart3 className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">Excellent</div>
              <p className="text-xs text-green-600">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData?.recentActivity?.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'appointment' ? 'bg-blue-500' :
                          activity.type === 'user' ? 'bg-green-500' :
                          activity.type === 'payment' ? 'bg-purple-500' : 'bg-orange-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="w-full" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Service
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Add Staff
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      View Schedule
                    </Button>
                    <Button className="w-full" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Reports
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Service Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Service
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => handleServiceEdit(service)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Badge variant={service.active ? "default" : "secondary"}>
                      {service.active ? "Active" : "Inactive"}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Category:</span>
                        <span className="text-sm font-medium capitalize">{service.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Price:</span>
                        <span className="text-sm font-medium">${service.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Duration:</span>
                        <span className="text-sm font-medium">{service.duration} min</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="staff" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Staff Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Staff Member
              </Button>
            </div>

            <div className="space-y-4">
              {staff.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{member.name}</h3>
                          <p className="text-gray-600">{member.role}</p>
                          <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={member.active ? "default" : "secondary"}>
                          {member.active ? "Active" : "Inactive"}
                        </Badge>
                        <span className="text-sm text-gray-600">{member.schedule}</span>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Business Settings</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input 
                      id="businessName" 
                      value={businessSettings.businessName}
                      onChange={(e) => setBusinessSettings({...businessSettings, businessName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      value={businessSettings.address}
                      onChange={(e) => setBusinessSettings({...businessSettings, address: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      value={businessSettings.phone}
                      onChange={(e) => setBusinessSettings({...businessSettings, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      value={businessSettings.email}
                      onChange={(e) => setBusinessSettings({...businessSettings, email: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="advanceBooking">Advance Booking (days)</Label>
                    <Input 
                      id="advanceBooking" 
                      type="number"
                      value={businessSettings.bookingSettings.advanceBookingDays}
                      onChange={(e) => setBusinessSettings({
                        ...businessSettings, 
                        bookingSettings: {...businessSettings.bookingSettings, advanceBookingDays: parseInt(e.target.value)}
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cancellationHours">Cancellation Notice (hours)</Label>
                    <Input 
                      id="cancellationHours" 
                      type="number"
                      value={businessSettings.bookingSettings.cancellationHours}
                      onChange={(e) => setBusinessSettings({
                        ...businessSettings, 
                        bookingSettings: {...businessSettings.bookingSettings, cancellationHours: parseInt(e.target.value)}
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointmentDuration">Default Duration (minutes)</Label>
                    <Input 
                      id="appointmentDuration" 
                      type="number"
                      value={businessSettings.bookingSettings.appointmentDuration}
                      onChange={(e) => setBusinessSettings({
                        ...businessSettings, 
                        bookingSettings: {...businessSettings.bookingSettings, appointmentDuration: parseInt(e.target.value)}
                      })}
                    />
                  </div>
                  <Button onClick={saveBusinessSettings} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>

            <Card>
              <CardHeader>
                <CardTitle>Website Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="heroTitle">Hero Title</Label>
                  <Input 
                    id="heroTitle" 
                    value={websiteContent.heroTitle}
                    onChange={(e) => setWebsiteContent({...websiteContent, heroTitle: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                  <Input 
                    id="heroSubtitle" 
                    value={websiteContent.heroSubtitle}
                    onChange={(e) => setWebsiteContent({...websiteContent, heroSubtitle: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aboutText">About Text</Label>
                  <Textarea 
                    id="aboutText" 
                    value={websiteContent.aboutText}
                    onChange={(e) => setWebsiteContent({...websiteContent, aboutText: e.target.value})}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="missionStatement">Mission Statement</Label>
                  <Textarea 
                    id="missionStatement" 
                    value={websiteContent.missionStatement}
                    onChange={(e) => setWebsiteContent({...websiteContent, missionStatement: e.target.value})}
                    rows={3}
                  />
                </div>
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Update Content
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>This Week:</span>
                      <span className="font-bold">47 appointments</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Week:</span>
                      <span>42 appointments</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Growth:</span>
                      <span className="text-green-600">+11.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>This Month:</span>
                      <span className="font-bold">$24,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Month:</span>
                      <span>$23,156</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Growth:</span>
                      <span className="text-green-600">+7.3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Chiropractic:</span>
                      <span className="font-bold">32%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Personal Training:</span>
                      <span>28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nutrition:</span>
                      <span>21%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit Service Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Service</DialogTitle>
              <DialogDescription>
                Update service details and pricing.
              </DialogDescription>
            </DialogHeader>
            {editingItem && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceName">Service Name</Label>
                  <Input 
                    id="serviceName" 
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servicePrice">Price ($)</Label>
                  <Input 
                    id="servicePrice" 
                    type="number"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({...editingItem, price: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceDuration">Duration (minutes)</Label>
                  <Input 
                    id="serviceDuration" 
                    type="number"
                    value={editingItem.duration}
                    onChange={(e) => setEditingItem({...editingItem, duration: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceCategory">Category</Label>
                  <Select value={editingItem.category} onValueChange={(value) => setEditingItem({...editingItem, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clinic">Clinic</SelectItem>
                      <SelectItem value="gym">Gym</SelectItem>
                      <SelectItem value="nutrition">Nutrition</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleServiceSave}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}