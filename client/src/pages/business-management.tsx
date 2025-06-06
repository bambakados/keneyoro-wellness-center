import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Package
} from "lucide-react";
import { Helmet } from "react-helmet";

export default function BusinessManagement() {
  const [activeTab, setActiveTab] = useState("payments");

  // Payment processing data
  const paymentStats = {
    todayRevenue: 3247.50,
    weeklyRevenue: 18750.25,
    monthlyRevenue: 67840.75,
    pendingPayments: 12,
    successfulTransactions: 156,
    failedTransactions: 3
  };

  // Appointment scheduling data
  const appointmentData = {
    todayAppointments: 24,
    weeklyAppointments: 147,
    avgWaitTime: "12 minutes",
    noShowRate: 8.5,
    rescheduleRate: 15.2,
    satisfactionScore: 4.7
  };

  // Revenue breakdown by service
  const revenueByService = [
    { service: "Clinic Services", revenue: 28500, percentage: 42, growth: "+15%" },
    { service: "Gym Memberships", revenue: 18200, percentage: 27, growth: "+8%" },
    { service: "Restaurant Sales", revenue: 12800, percentage: 19, growth: "+22%" },
    { service: "Store Products", revenue: 8340, percentage: 12, growth: "+18%" }
  ];

  // Recent transactions
  const recentTransactions = [
    {
      id: "TXN-2024-001234",
      customer: "Sarah Johnson",
      service: "Wellness Package + Lunch",
      amount: 125.50,
      status: "completed",
      method: "card",
      time: "2 minutes ago"
    },
    {
      id: "TXN-2024-001233",
      customer: "Michael Chen",
      service: "African Dance Class",
      amount: 35.00,
      status: "completed",
      method: "digital_wallet",
      time: "15 minutes ago"
    },
    {
      id: "TXN-2024-001232",
      customer: "Aminata Diallo",
      service: "Moringa Supplements",
      amount: 67.99,
      status: "pending",
      method: "bank_transfer",
      time: "1 hour ago"
    },
    {
      id: "TXN-2024-001231",
      customer: "David Thompson",
      service: "Health Assessment",
      amount: 185.00,
      status: "completed",
      method: "card",
      time: "2 hours ago"
    }
  ];

  // Appointment scheduling overview
  const upcomingAppointments = [
    {
      time: "9:00 AM",
      patient: "Maria Garcia",
      service: "Wellness Consultation",
      provider: "Dr. Ibrahim Bamba",
      type: "in-person",
      duration: "45 min"
    },
    {
      time: "10:30 AM",
      patient: "James Wilson",
      service: "Chiropractic Adjustment",
      provider: "Dr. Aminata Kone",
      type: "in-person",
      duration: "30 min"
    },
    {
      time: "11:15 AM",
      patient: "Fatou Camara",
      service: "Nutrition Counseling",
      provider: "Chef Aisha Koroma",
      type: "telehealth",
      duration: "60 min"
    },
    {
      time: "2:00 PM",
      patient: "Robert Kim",
      service: "Fitness Assessment",
      provider: "Fatou Diallo",
      type: "in-person",
      duration: "45 min"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-50 text-green-700 border-green-200";
      case "pending": return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "failed": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "card": return "💳";
      case "digital_wallet": return "📱";
      case "bank_transfer": return "🏦";
      case "cash": return "💵";
      default: return "💰";
    }
  };

  return (
    <>
      <Helmet>
        <title>Business Management - KeneYoro Wellness Center</title>
        <meta name="description" content="Comprehensive business management dashboard for KeneYoro wellness center including payment processing, appointment scheduling, and revenue analytics." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            💼 Business Management
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive business operations dashboard for your KeneYoro wellness center. 
            Manage payments, appointments, revenue tracking, and business analytics.
          </p>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">${paymentStats.todayRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-600">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{appointmentData.todayAppointments}</div>
              <p className="text-xs text-blue-600">85% capacity</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">347</div>
              <p className="text-xs text-purple-600">+23 this week</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction Score</CardTitle>
              <Star className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">{appointmentData.satisfactionScore}/5.0</div>
              <p className="text-xs text-orange-600">Based on 127 reviews</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="payments">Payment Processing</TabsTrigger>
            <TabsTrigger value="appointments">Appointment Management</TabsTrigger>
            <TabsTrigger value="analytics">Business Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="payments" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Processing Dashboard</h2>
              <p className="text-gray-600">Monitor transactions, revenue, and payment methods across all services</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    Recent Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="text-2xl">{getPaymentMethodIcon(transaction.method)}</div>
                          <div>
                            <p className="font-medium text-gray-900">{transaction.customer}</p>
                            <p className="text-sm text-gray-600">{transaction.service}</p>
                            <p className="text-xs text-gray-500">{transaction.id} • {transaction.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">${transaction.amount}</p>
                          <Badge className={`text-xs ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-800">Successful Transactions</p>
                    <p className="text-2xl font-bold text-green-700">{paymentStats.successfulTransactions}</p>
                    <p className="text-sm text-green-600">98.1% success rate</p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="font-medium text-yellow-800">Pending Payments</p>
                    <p className="text-2xl font-bold text-yellow-700">{paymentStats.pendingPayments}</p>
                    <p className="text-sm text-yellow-600">Awaiting processing</p>
                  </div>
                  
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="font-medium text-red-800">Failed Transactions</p>
                    <p className="text-2xl font-bold text-red-700">{paymentStats.failedTransactions}</p>
                    <p className="text-sm text-red-600">Require attention</p>
                  </div>

                  <Button className="w-full">Process Pending Payments</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Management</h2>
              <p className="text-gray-600">Schedule, manage, and optimize appointment bookings across all services</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-600" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="font-bold text-blue-600">{appointment.time}</p>
                            <p className="text-xs text-gray-500">{appointment.duration}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{appointment.patient}</p>
                            <p className="text-sm text-gray-600">{appointment.service}</p>
                            <p className="text-xs text-gray-500">with {appointment.provider}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={appointment.type === "telehealth" ? "outline" : "default"}>
                            {appointment.type === "telehealth" ? "📹 Virtual" : "🏥 In-Person"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scheduling Analytics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-sm mb-2">Weekly Capacity</p>
                    <Progress value={78} className="mb-1" />
                    <p className="text-xs text-gray-600">78% booked (147/188 slots)</p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-800">Average Wait Time</p>
                    <p className="text-lg font-bold text-blue-700">{appointmentData.avgWaitTime}</p>
                  </div>
                  
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="font-medium text-orange-800">No-Show Rate</p>
                    <p className="text-lg font-bold text-orange-700">{appointmentData.noShowRate}%</p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="font-medium text-purple-800">Reschedule Rate</p>
                    <p className="text-lg font-bold text-purple-700">{appointmentData.rescheduleRate}%</p>
                  </div>

                  <Button className="w-full">Optimize Schedule</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Analytics</h2>
              <p className="text-gray-600">Revenue insights, service performance, and growth metrics</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Revenue by Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueByService.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{item.service}</span>
                          <div className="text-right">
                            <span className="font-bold">${item.revenue.toLocaleString()}</span>
                            <span className="text-sm text-green-600 ml-2">{item.growth}</span>
                          </div>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                        <p className="text-xs text-gray-600">{item.percentage}% of total revenue</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue Trends</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <p className="font-medium text-gray-800">Monthly Revenue</p>
                    <p className="text-3xl font-bold text-green-700">${paymentStats.monthlyRevenue.toLocaleString()}</p>
                    <p className="text-sm text-green-600">+18% from last month</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-800">Weekly Revenue</p>
                    <p className="text-2xl font-bold text-blue-700">${paymentStats.weeklyRevenue.toLocaleString()}</p>
                    <p className="text-sm text-blue-600">+12% from last week</p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Key Performance Indicators</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="font-bold text-gray-800">$127</p>
                        <p className="text-gray-600">Avg. Transaction</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="font-bold text-gray-800">2.3</p>
                        <p className="text-gray-600">Services per Visit</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="font-bold text-gray-800">87%</p>
                        <p className="text-gray-600">Customer Retention</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="font-bold text-gray-800">4.2</p>
                        <p className="text-gray-600">Visits per Month</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Download Analytics Report</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            💰 Business Growth Opportunities
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">📈</div>
              <p className="font-medium">Revenue Optimization</p>
              <p className="text-gray-600">Bundle services for higher value transactions</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">⏰</div>
              <p className="font-medium">Schedule Efficiency</p>
              <p className="text-gray-600">Reduce wait times and optimize capacity</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🎯</div>
              <p className="font-medium">Customer Retention</p>
              <p className="text-gray-600">Implement loyalty programs and follow-ups</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}