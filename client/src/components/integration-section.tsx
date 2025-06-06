import { Check } from "lucide-react";
import { Link } from "wouter";

export default function IntegrationSection() {
  const servicesData = [
    {
      id: "clinic",
      title: "Medical Clinic",
      icon: "hospital",
      color: "primary",
      description: "Personalized care plans and medical services focused on your specific health needs.",
      features: [
        "Comprehensive health assessments",
        "Preventive care programs",
        "Specialist referrals"
      ],
      connects: ["gym", "restaurant", "store"]
    },
    {
      id: "gym",
      title: "Fitness Center",
      icon: "heart-pulse",
      color: "secondary",
      description: "State-of-the-art equipment and expert-led classes to achieve your fitness goals.",
      features: [
        "Personalized training programs",
        "Group fitness classes",
        "Progress tracking"
      ],
      connects: ["clinic", "restaurant"]
    },
    {
      id: "restaurant",
      title: "Healthy Restaurant",
      icon: "restaurant",
      color: "accent",
      description: "Nutritious, delicious meals crafted with organic ingredients to fuel your body.",
      features: [
        "Nutritionally balanced menu",
        "Diet-specific options",
        "Nutrition information"
      ],
      connects: ["clinic", "gym", "store"]
    },
    {
      id: "store",
      title: "Organic Market",
      icon: "shopping-basket",
      color: "primary",
      description: "Curated selection of organic produce and wellness products for your home.",
      features: [
        "Fresh organic produce",
        "Health supplements",
        "Prepared meals"
      ],
      connects: ["clinic", "restaurant"]
    }
  ];

  const getIconElement = (iconName: string, color: string) => {
    const classes = `text-2xl text-${color}`;
    
    switch (iconName) {
      case "hospital":
        return <i className={`ri-hospital-line ${classes}`}></i>;
      case "heart-pulse":
        return <i className={`ri-heart-pulse-line ${classes}`}></i>;
      case "restaurant":
        return <i className={`ri-restaurant-line ${classes}`}></i>;
      case "shopping-basket":
        return <i className={`ri-shopping-basket-line ${classes}`}></i>;
      default:
        return null;
    }
  };

  const getSmallIconElement = (iconName: string, color: string) => {
    const classes = `text-sm text-${color}`;
    
    switch (iconName) {
      case "hospital":
        return <i className={`ri-hospital-line ${classes}`}></i>;
      case "heart-pulse":
        return <i className={`ri-heart-pulse-line ${classes}`}></i>;
      case "restaurant":
        return <i className={`ri-restaurant-line ${classes}`}></i>;
      case "shopping-basket":
        return <i className={`ri-shopping-basket-line ${classes}`}></i>;
      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">The Complete Wellness Experience</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            How our services work together to provide a holistic approach to your health and wellness journey.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection Lines (Desktop only) */}
          <div className="hidden md:block absolute inset-0 z-0">
            <svg className="w-full h-full" viewBox="0 0 800 350" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M200 100 C 300 10, 500 10, 600 100" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="5,5" />
              <path d="M200 250 C 300 340, 500 340, 600 250" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="5,5" />
              <path d="M150 175 L 650 175" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
            {servicesData.map(service => (
              <div key={service.id} className={`bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-t-4 border-${service.color}`}>
                <div className={`h-14 w-14 bg-${service.color}/10 rounded-full flex items-center justify-center mb-4`}>
                  {getIconElement(service.icon, service.color)}
                </div>
                <h3 className="text-xl font-bold mb-2 text-neutral-800">{service.title}</h3>
                <p className="text-neutral-600 mb-4">{service.description}</p>
                <ul className="space-y-2 text-sm text-neutral-600 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <i className={`ri-check-line text-${service.color} mr-2`}></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-neutral-200">
                  <span className={`text-sm font-medium text-${service.color}`}>Connects with</span>
                  <div className="flex space-x-2 mt-2">
                    {service.connects.map(connectId => {
                      const connectedService = servicesData.find(s => s.id === connectId);
                      return connectedService ? (
                        <div key={connectId} className={`bg-${connectedService.color}/20 h-8 w-8 rounded-full flex items-center justify-center`}>
                          {getSmallIconElement(connectedService.icon, connectedService.color)}
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block bg-neutral-100 rounded-xl p-6 max-w-2xl">
            <h3 className="text-xl font-bold mb-2">One Membership, Complete Wellness</h3>
            <p className="text-neutral-600 mb-6">
              Join our integrated wellness program and enjoy exclusive benefits across all our services.
            </p>
            <Link href="/membership">
              <a className="inline-block bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold py-3 px-8 rounded-lg transition shadow-md">
                Become a Member
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
