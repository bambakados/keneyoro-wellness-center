import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainLayout from "./components/layouts/main-layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Profile from "@/pages/profile";
import Appointments from "@/pages/appointments";
import Classes from "@/pages/classes";
import Menu from "@/pages/menu";
import Shop from "@/pages/shop";
import Cart from "@/pages/cart";
import Telehealth from "@/pages/telehealth";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Loyalty from "@/pages/loyalty";
import Challenges from "@/pages/challenges";
import HealthTracking from "@/pages/health-tracking";
import BusinessCardPage from "@/pages/business-card";
import WellnessDashboard from "@/pages/wellness-dashboard";
import SmartPrescriptions from "@/pages/smart-prescriptions";
import WellnessConcierge from "@/pages/wellness-concierge";
import CommunityWellness from "@/pages/community-wellness";
import IoTAnalytics from "@/pages/iot-analytics";
import GlobalWellness from "@/pages/global-wellness";
import BusinessManagement from "@/pages/business-management";
import MarketingIntegration from "@/pages/marketing-integration";
import CulturalWellnessPrograms from "@/pages/cultural-wellness-programs";
import AdminDashboard from "@/pages/admin-dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/appointments" component={Appointments} />
      <Route path="/classes" component={Classes} />
      <Route path="/menu" component={Menu} />
      <Route path="/shop" component={Shop} />
      <Route path="/cart" component={Cart} />
      <Route path="/telehealth" component={Telehealth} />
      <Route path="/health-tracking" component={HealthTracking} />
      <Route path="/wellness-dashboard" component={WellnessDashboard} />
      <Route path="/smart-prescriptions" component={SmartPrescriptions} />
      <Route path="/wellness-concierge" component={WellnessConcierge} />
      <Route path="/community-wellness" component={CommunityWellness} />
      <Route path="/iot-analytics" component={IoTAnalytics} />
      <Route path="/global-wellness" component={GlobalWellness} />
      <Route path="/business-management" component={BusinessManagement} />
      <Route path="/marketing-integration" component={MarketingIntegration} />
      <Route path="/cultural-wellness-programs" component={CulturalWellnessPrograms} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route path="/business-card" component={BusinessCardPage} />
      <Route path="/loyalty" component={Loyalty} />
      <Route path="/challenges" component={Challenges} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/register" component={Register} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MainLayout>
          <Router />
        </MainLayout>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
