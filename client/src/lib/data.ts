// Static data for UI components

export const metricsData = [
  { value: "98%", label: "Patient Satisfaction" },
  { value: "15+", label: "Medical Specialists" },
  { value: "24", label: "Weekly Classes" },
  { value: "100%", label: "Organic Products" }
];

export const clinicServices = [
  {
    title: "Primary Care",
    description: "Comprehensive health assessments and ongoing care"
  },
  {
    title: "Chiropractic Care",
    description: "Spinal adjustments, musculoskeletal therapy, and pain management"
  },
  {
    title: "Specialty Services",
    description: "Access to specialists in various medical fields"
  },
  {
    title: "Preventive Care",
    description: "Screenings, vaccinations, and wellness plans"
  }
];

export const gymServices = [
  {
    title: "Modern Equipment",
    description: "Latest cardio and strength training machines"
  },
  {
    title: "Group Classes",
    description: "Yoga, HIIT, cycling, and specialized training"
  },
  {
    title: "Personal Training",
    description: "Customized programs with expert trainers"
  }
];

export const restaurantServices = [
  {
    title: "Seasonal Menu",
    description: "Fresh ingredients at peak nutritional value"
  },
  {
    title: "Dietary Options",
    description: "Vegan, gluten-free, and allergen-conscious choices"
  },
  {
    title: "Nutrition Tracking",
    description: "Detailed nutritional information for all meals"
  }
];

export const marketServices = [
  {
    title: "Organic Produce",
    description: "Fresh fruits and vegetables from local farms"
  },
  {
    title: "Wellness Products",
    description: "Supplements, natural remedies, and self-care items"
  },
  {
    title: "Prepared Meals",
    description: "Ready-to-eat healthy options for busy days"
  }
];

export const clinicAppointments = [
  {
    id: 1,
    title: "General Checkup",
    provider: "Dr. Sarah Johnson",
    duration: "30 min",
    date: "Tomorrow",
    time: "9:00 AM"
  },
  {
    id: 2,
    title: "Nutritional Consultation",
    provider: "Dr. Michael Chen",
    duration: "45 min",
    date: "Thursday",
    time: "2:30 PM"
  },
  {
    id: 3,
    title: "Physical Therapy",
    provider: "Lisa Rodriguez, PT",
    duration: "60 min",
    date: "Friday",
    time: "11:00 AM"
  },
  {
    id: 4,
    title: "Chiropractic Adjustment",
    provider: "Dr. David Thompson, DC",
    duration: "45 min",
    date: "Thursday",
    time: "2:30 PM"
  },
  {
    id: 5,
    title: "Spinal Decompression",
    provider: "Dr. Maria Santos, DC",
    duration: "30 min",
    date: "Monday",
    time: "9:00 AM"
  }
];

export const upcomingActivities = [
  {
    icon: "hospital",
    title: "Nutritionist Appointment",
    time: "Tomorrow, 10:30 AM",
    type: "clinic"
  },
  {
    icon: "heart-pulse",
    title: "Yoga Class",
    time: "Friday, 5:30 PM",
    type: "fitness"
  },
  {
    icon: "shopping-basket",
    title: "Meal Prep Box Delivery",
    time: "Saturday, 12:00 PM",
    type: "market"
  }
];

export const monthlyProgress = {
  currentWeek: 5,
  weeks: [30, 45, 65, 40, 75, 60],
  stats: [
    { label: "Gym Visits", value: "12 visits", color: "primary" },
    { label: "Healthy Meals", value: "18 orders", color: "accent" },
    { label: "Health Points Earned", value: "245 pts", color: "secondary" }
  ]
};

export const testimonials = [
  {
    name: "Sarah Thompson",
    duration: "Member for 8 months",
    rating: 5,
    comment: "The integration between the clinic and fitness center has completely changed my approach to health. My doctor and trainer work together on my program, and I've seen amazing results.",
    services: ["clinic", "fitness"]
  },
  {
    name: "Michael Rodriguez",
    duration: "Member for 1 year",
    rating: 4.5,
    comment: "Having healthy meal options and a quality grocery store in the same place as my gym makes sticking to my nutritional plan so much easier. The staff recommendations across all services are always spot-on.",
    services: ["fitness", "restaurant"]
  },
  {
    name: "Jennifer Liu",
    duration: "Member for 6 months",
    rating: 5,
    comment: "I love how my nutritionist at the clinic can send recommendations directly to my app for shopping at the market or ordering from the restaurant. Everything is connected, making healthy living effortless.",
    services: ["clinic", "market"]
  }
];
