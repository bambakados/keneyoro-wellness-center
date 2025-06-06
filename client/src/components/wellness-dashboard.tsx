import { upcomingActivities, monthlyProgress } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

export default function WellnessDashboard() {
  const { data: healthMetrics } = useQuery({
    queryKey: ['/api/auth/me'],
    queryFn: async () => {
      try {
        // In a real app, this would fetch from the API
        return {
          metrics: {
            activityGoal: 75,
            nutritionGoal: 60,
            sleepQuality: 85
          }
        };
      } catch (error) {
        return { metrics: null };
      }
    }
  });

  const metrics = healthMetrics?.metrics || {
    activityGoal: 75,
    nutritionGoal: 60,
    sleepQuality: 85
  };

  const icons = {
    hospital: <i className="ri-hospital-line text-primary"></i>,
    "heart-pulse": <i className="ri-heart-pulse-line text-secondary"></i>,
    "shopping-basket": <i className="ri-shopping-basket-line text-accent"></i>
  };

  return (
    <section className="py-12 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Your Integrated Wellness Journey</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Track your progress across all our services with our comprehensive wellness dashboard.
          </p>
        </div>
        
        {/* Dashboard Preview */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Wellness Dashboard</h3>
                <p className="opacity-90">Your health metrics at a glance</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="text-sm font-medium">Last Updated: Today, 2:45 PM</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Health Metrics Card */}
              <div className="bg-neutral-50 rounded-lg p-6">
                <div className="flex justify-between items-start mb-6">
                  <h4 className="font-bold text-neutral-800">Health Metrics</h4>
                  <button className="text-primary">
                    <i className="ri-more-2-fill"></i>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-neutral-700">Activity Goal</span>
                      <span className="text-sm text-neutral-500">{metrics.activityGoal}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${metrics.activityGoal}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-neutral-700">Nutrition Goal</span>
                      <span className="text-sm text-neutral-500">{metrics.nutritionGoal}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full" 
                        style={{ width: `${metrics.nutritionGoal}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-neutral-700">Sleep Quality</span>
                      <span className="text-sm text-neutral-500">{metrics.sleepQuality}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-secondary h-2 rounded-full" 
                        style={{ width: `${metrics.sleepQuality}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link href="/dashboard/metrics">
                    <a className="block w-full bg-white border border-primary text-primary font-medium py-2 rounded hover:bg-primary-light/10 transition text-center">
                      View Details
                    </a>
                  </Link>
                </div>
              </div>
              
              {/* Upcoming Activities */}
              <div className="bg-neutral-50 rounded-lg p-6">
                <div className="flex justify-between items-start mb-6">
                  <h4 className="font-bold text-neutral-800">Upcoming Activities</h4>
                  <button className="text-primary">
                    <i className="ri-calendar-line"></i>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {upcomingActivities.map((activity, index) => (
                    <div key={index} className="flex items-start p-3 bg-white rounded-lg">
                      <div className="flex-shrink-0 h-10 w-10 bg-primary-light/20 rounded-full flex items-center justify-center mr-3">
                        {activity.icon === "hospital" && <i className="ri-hospital-line text-primary"></i>}
                        {activity.icon === "heart-pulse" && <i className="ri-heart-pulse-line text-secondary"></i>}
                        {activity.icon === "shopping-basket" && <i className="ri-shopping-basket-line text-accent"></i>}
                      </div>
                      <div>
                        <h5 className="font-medium text-neutral-800">{activity.title}</h5>
                        <p className="text-sm text-neutral-600">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Link href="/dashboard/activities">
                    <a className="block w-full bg-white border border-primary text-primary font-medium py-2 rounded hover:bg-primary-light/10 transition text-center">
                      View All
                    </a>
                  </Link>
                </div>
              </div>
              
              {/* Progress Summary */}
              <div className="bg-neutral-50 rounded-lg p-6">
                <div className="flex justify-between items-start mb-6">
                  <h4 className="font-bold text-neutral-800">Monthly Progress</h4>
                  <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                    +12% from last month
                  </div>
                </div>
                
                <div className="h-48 flex items-end justify-between space-x-2 mb-2">
                  {monthlyProgress.weeks.map((week, index) => (
                    <div 
                      key={index}
                      className={`w-1/6 ${index === monthlyProgress.currentWeek - 1 ? 'bg-primary' : 'bg-primary-light/30'} rounded-t-md`}
                      style={{ height: `${week}%` }}
                    ></div>
                  ))}
                </div>
                
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span>Week 4</span>
                  <span>Week 5</span>
                  <span>Week 6</span>
                </div>
                
                <div className="mt-6 space-y-2">
                  {monthlyProgress.stats.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium text-neutral-700">{stat.label}</span>
                      <span className={`text-sm font-medium text-${stat.color}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Link href="/dashboard">
            <a className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition shadow-md">
              <i className="ri-user-line mr-2"></i>
              Access Your Personal Dashboard
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
