import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { Check } from "lucide-react";
import { 
  clinicServices, 
  gymServices, 
  restaurantServices, 
  marketServices,
  clinicAppointments 
} from "@/lib/data";
import { useQuery } from "@tanstack/react-query";

type TabType = "clinic" | "gym" | "restaurant" | "store";

export default function ServiceTabs() {
  const [activeTab, setActiveTab] = useState<TabType>("clinic");

  const { data: fitnessClasses } = useQuery({
    queryKey: ['/api/fitness-classes'],
    queryFn: async () => {
      const res = await fetch('/api/fitness-classes');
      if (!res.ok) throw new Error('Failed to fetch fitness classes');
      return res.json();
    }
  });

  const { data: menuItems } = useQuery({
    queryKey: ['/api/menu'],
    queryFn: async () => {
      const res = await fetch('/api/menu');
      if (!res.ok) throw new Error('Failed to fetch menu items');
      return res.json();
    }
  });

  const { data: storeProducts } = useQuery({
    queryKey: ['/api/store'],
    queryFn: async () => {
      const res = await fetch('/api/store');
      if (!res.ok) throw new Error('Failed to fetch store products');
      return res.json();
    }
  });

  const classes = fitnessClasses?.classes || [];
  const menu = menuItems?.menuItems || [];
  const products = storeProducts?.products || [];

  const getTabIcon = (tab: TabType) => {
    switch (tab) {
      case "clinic":
        return "hospital";
      case "gym":
        return "heart-pulse";
      case "restaurant":
        return "restaurant";
      case "store":
        return "shopping-basket";
    }
  };

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Our Integrated Services</h2>
        
        <div className="flex overflow-x-auto scroll-hidden pb-2 mb-6 justify-center">
          {(["clinic", "gym", "restaurant", "store"] as TabType[]).map((tab) => (
            <button
              key={tab}
              className={cn(
                "tab-underline flex items-center px-5 py-3 font-medium whitespace-nowrap", 
                activeTab === tab 
                  ? "text-primary active" 
                  : "text-neutral-600"
              )}
              onClick={() => setActiveTab(tab)}
            >
              <i className={`ri-${getTabIcon(tab)}-line mr-2 text-xl`}></i>
              {tab === "clinic" && "Medical Clinic"}
              {tab === "gym" && "Fitness Center"}
              {tab === "restaurant" && "Healthy Restaurant"}
              {tab === "store" && "Organic Market"}
            </button>
          ))}
        </div>

        {/* Clinic Tab */}
        <div id="clinic-tab" className={cn("tab-content", activeTab !== "clinic" && "hidden")}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-800">Modern Medical Clinic</h3>
              <p className="text-neutral-600 mb-6">
                Our state-of-the-art medical facility provides comprehensive healthcare services with a focus on preventive care and holistic wellness.
              </p>
              
              <div className="space-y-4 mb-6">
                {clinicServices.map((service, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-light/20 flex items-center justify-center mt-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-neutral-800">{service.title}</h4>
                      <p className="text-sm text-neutral-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/appointments">
                <a className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition">
                  Book Medical Appointment
                </a>
              </Link>
            </div>
            
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
                alt="Modern clinic reception" 
                className="rounded-lg shadow-md w-full" 
              />
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Doctor consultation" 
                  className="rounded-lg shadow-md w-full h-40 object-cover" 
                />
                <img 
                  src="https://pixabay.com/get/g6a599db6fdcf45d911042f066662f5045e795241d979db767476070e7f6c37ed2a6ba4776a1a3e82aae2d8694515ddbb67ac0f425ffc59a64a668c65c69557e9_1280.jpg" 
                  alt="Modern medical equipment" 
                  className="rounded-lg shadow-md w-full h-40 object-cover" 
                />
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6 text-neutral-800">Available Appointments</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <Link href={`/appointments/book/${appointment.id}`}>
                    <a className="block w-full bg-white hover:bg-neutral-200 text-primary font-medium py-2 rounded transition text-center">
                      Book Now
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gym Tab */}
        <div id="gym-tab" className={cn("tab-content", activeTab !== "gym" && "hidden")}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-800">State-of-the-Art Fitness Center</h3>
              <p className="text-neutral-600 mb-6">
                Our fitness center offers premium equipment, expert trainers, and diverse classes to help you achieve your health and fitness goals.
              </p>
              
              <div className="space-y-4 mb-6">
                {gymServices.map((service, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary-light/20 flex items-center justify-center mt-1">
                      <Check className="h-4 w-4 text-secondary" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-neutral-800">{service.title}</h4>
                      <p className="text-sm text-neutral-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/membership">
                <a className="inline-block bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-6 rounded-lg transition">
                  View Membership Options
                </a>
              </Link>
            </div>
            
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
                alt="Modern fitness center" 
                className="rounded-lg shadow-md w-full" 
              />
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Personal training session" 
                  className="rounded-lg shadow-md w-full h-40 object-cover" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Fitness class" 
                  className="rounded-lg shadow-md w-full h-40 object-cover" 
                />
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6 text-neutral-800">Upcoming Classes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {classes.slice(0, 3).map((fitnessClass) => (
                <div key={fitnessClass.id} className="bg-neutral-100 rounded-lg p-6 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-medium text-neutral-800">{fitnessClass.className}</h4>
                      <p className="text-sm text-neutral-600">{fitnessClass.instructor}</p>
                    </div>
                    <span className="bg-secondary-light/20 text-secondary text-xs font-medium px-2 py-1 rounded">
                      {fitnessClass.duration} min
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-neutral-600">
                      <i className="ri-calendar-line mr-2"></i>
                      <span>{fitnessClass.day}</span>
                    </div>
                    <div className="flex items-center text-neutral-600">
                      <i className="ri-time-line mr-2"></i>
                      <span>{fitnessClass.time}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center w-full">
                      <div className="bg-secondary-light/30 h-2 w-full rounded-full">
                        <div 
                          className="bg-secondary h-2 rounded-full" 
                          style={{ width: `${(fitnessClass.currentRegistered / fitnessClass.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm text-neutral-600 ml-4">
                      {fitnessClass.capacity - fitnessClass.currentRegistered} spots left
                    </span>
                  </div>
                  <Link href={`/classes/reserve/${fitnessClass.id}`}>
                    <a className="block w-full bg-white hover:bg-neutral-200 text-secondary font-medium py-2 rounded transition text-center">
                      Reserve Spot
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Restaurant Tab */}
        <div id="restaurant-tab" className={cn("tab-content", activeTab !== "restaurant" && "hidden")}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-800">Farm-to-Table Restaurant</h3>
              <p className="text-neutral-600 mb-6">
                Our healthy restaurant serves delicious, nutrient-rich meals created with locally-sourced organic ingredients to support your wellness journey.
              </p>
              
              <div className="space-y-4 mb-6">
                {restaurantServices.map((service, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-light/20 flex items-center justify-center mt-1">
                      <Check className="h-4 w-4 text-accent" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-neutral-800">{service.title}</h4>
                      <p className="text-sm text-neutral-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/menu">
                <a className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold py-2 px-6 rounded-lg transition">
                  View Menu & Order
                </a>
              </Link>
            </div>
            
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
                alt="Healthy meal plating" 
                className="rounded-lg shadow-md w-full" 
              />
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Chef preparing fresh ingredients" 
                  className="rounded-lg shadow-md w-full h-40 object-cover" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Colorful healthy salad" 
                  className="rounded-lg shadow-md w-full h-40 object-cover" 
                />
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6 text-neutral-800">Featured Menu Items</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {menu.slice(0, 3).map((item) => (
                <div key={item.id} className="bg-neutral-100 rounded-lg overflow-hidden hover:shadow-md transition">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-48 object-cover" 
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-neutral-800">{item.name}</h4>
                      <span className="text-accent font-medium">${(item.price / 100).toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-neutral-600 mb-4">{item.description}</p>
                    <div className="flex items-center space-x-2 mb-4">
                      {item.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="bg-accent-light/20 text-accent text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link href={`/menu/add/${item.id}`}>
                      <a className="block w-full bg-white hover:bg-neutral-200 text-accent font-medium py-2 rounded transition text-center">
                        Add to Order
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Tab */}
        <div id="store-tab" className={cn("tab-content", activeTab !== "store" && "hidden")}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-800">Organic Food Market</h3>
              <p className="text-neutral-600 mb-6">
                Our carefully curated market offers organic produce, supplements, and wellness products to support your healthy lifestyle at home.
              </p>
              
              <div className="space-y-4 mb-6">
                {marketServices.map((service, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-light/20 flex items-center justify-center mt-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium text-neutral-800">{service.title}</h4>
                      <p className="text-sm text-neutral-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/shop">
                <a className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition">
                  Shop Now
                </a>
              </Link>
            </div>
            
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
                alt="Organic food market" 
                className="rounded-lg shadow-md w-full" 
              />
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1573246123716-6b1782bfc499?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Fresh organic produce" 
                  className="rounded-lg shadow-md w-full h-40 object-cover" 
                />
                <img 
                  src="https://pixabay.com/get/g6b6e55e16fd0fd9de82c87f20418fb62278a092bc7d100eae4e0fd7126f185afe94bf51718cf2bca586a5fb3c7f85c3f4cad1b636b9dbe0dc3bd3acb6f8ac6cc_1280.jpg" 
                  alt="Natural supplements" 
                  className="rounded-lg shadow-md w-full h-40 object-cover" 
                />
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-neutral-800">Featured Products</h3>
              <div className="flex items-center">
                <span className="text-neutral-600 mr-2">Filter:</span>
                <select className="bg-white border border-neutral-300 rounded px-3 py-1 text-sm">
                  <option>All Categories</option>
                  <option>Fresh Produce</option>
                  <option>Supplements</option>
                  <option>Prepared Foods</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                  <div className="relative">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-40 object-cover" 
                    />
                    {product.tags.includes('Organic') && (
                      <div className="absolute top-2 right-2 bg-accent text-white text-xs font-medium px-2 py-1 rounded">New</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-neutral-800 mb-1">{product.name}</h4>
                    <p className="text-xs text-neutral-500 mb-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-medium">${(product.price / 100).toFixed(2)}</span>
                      <button 
                        className="bg-neutral-100 hover:bg-neutral-200 text-primary p-2 rounded-full"
                        onClick={() => {
                          // Add to cart functionality would go here
                        }}
                      >
                        <i className="ri-shopping-cart-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/shop">
                <a className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition">
                  View All Products
                  <i className="ri-arrow-right-line ml-2"></i>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
