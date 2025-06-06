import {
  users, User, InsertUser,
  appointments, Appointment, InsertAppointment,
  fitnessClasses, FitnessClass, InsertFitnessClass,
  classRegistrations, ClassRegistration, InsertClassRegistration,
  menuItems, MenuItem, InsertMenuItem,
  storeProducts, StoreProduct, InsertStoreProduct,
  cartItems, CartItem, InsertCartItem,
  healthMetrics, HealthMetric, InsertHealthMetric,
  dailyHealthLogs, DailyHealthLog, InsertDailyHealthLog,
  progressData, ProgressData, InsertProgressData,
  telehealthConsultations, TelehealthConsultation, InsertTelehealthConsultation,
  telehealthDoctors, TelehealthDoctor, InsertTelehealthDoctor,
  loyaltyProgram, LoyaltyProgram, InsertLoyaltyProgram,
  loyaltyTransactions, LoyaltyTransaction, InsertLoyaltyTransaction,
  loyaltyRewards, LoyaltyReward, InsertLoyaltyReward,
  userRewards, UserReward, InsertUserReward,
  wellnessChallenges, WellnessChallenge, InsertWellnessChallenge,
  challengeParticipation, ChallengeParticipation, InsertChallengeParticipation,
  challengeActivities, ChallengeActivity, InsertChallengeActivity,
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Appointment operations
  getAppointments(userId: number): Promise<Appointment[]>;
  getAppointment(id: number): Promise<Appointment | undefined>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointment(id: number, status: string): Promise<Appointment | undefined>;
  
  // Fitness class operations
  getFitnessClasses(): Promise<FitnessClass[]>;
  getFitnessClass(id: number): Promise<FitnessClass | undefined>;
  createFitnessClass(fitnessClass: InsertFitnessClass): Promise<FitnessClass>;
  
  // Class registration operations
  getClassRegistrations(userId: number): Promise<ClassRegistration[]>;
  createClassRegistration(registration: InsertClassRegistration): Promise<ClassRegistration>;
  deleteClassRegistration(userId: number, classId: number): Promise<boolean>;
  
  // Menu operations
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItem(id: number): Promise<MenuItem | undefined>;
  
  // Store operations
  getStoreProducts(): Promise<StoreProduct[]>;
  getStoreProduct(id: number): Promise<StoreProduct | undefined>;
  
  // Cart operations
  getCartItems(userId: number): Promise<CartItem[]>;
  getCartItem(id: number): Promise<CartItem | undefined>;
  createCartItem(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  deleteCartItem(id: number): Promise<boolean>;
  
  // Health metrics operations
  getHealthMetrics(userId: number): Promise<HealthMetric[]>;
  createHealthMetric(healthMetric: InsertHealthMetric): Promise<HealthMetric>;
  
  // Daily health log operations
  getDailyHealthLogs(userId: number, startDate?: string, endDate?: string): Promise<DailyHealthLog[]>;
  getDailyHealthLog(userId: number, date: string): Promise<DailyHealthLog | undefined>;
  createDailyHealthLog(healthLog: InsertDailyHealthLog): Promise<DailyHealthLog>;
  updateDailyHealthLog(userId: number, date: string, updates: Partial<InsertDailyHealthLog>): Promise<DailyHealthLog | undefined>;
  
  // Progress data operations
  getProgressData(userId: number): Promise<ProgressData[]>;
  createProgressData(progressData: InsertProgressData): Promise<ProgressData>;
  
  // Loyalty program operations
  getLoyaltyProgram(userId: number): Promise<LoyaltyProgram | undefined>;
  createLoyaltyProgram(program: InsertLoyaltyProgram): Promise<LoyaltyProgram>;
  updateLoyaltyPoints(userId: number, pointsChange: number, lifetimeSpentChange?: number): Promise<LoyaltyProgram | undefined>;
  
  // Loyalty transactions
  getLoyaltyTransactions(userId: number): Promise<LoyaltyTransaction[]>;
  createLoyaltyTransaction(transaction: InsertLoyaltyTransaction): Promise<LoyaltyTransaction>;
  
  // Loyalty rewards
  getLoyaltyRewards(): Promise<LoyaltyReward[]>;
  getLoyaltyRewardsByTier(tierLevel: number): Promise<LoyaltyReward[]>;
  createLoyaltyReward(reward: InsertLoyaltyReward): Promise<LoyaltyReward>;
  
  // User rewards
  getUserRewards(userId: number): Promise<UserReward[]>;
  redeemReward(userId: number, rewardId: number): Promise<UserReward>;
  useReward(userRewardId: number): Promise<UserReward | undefined>;

  // Wellness challenges
  getWellnessChallenges(): Promise<WellnessChallenge[]>;
  getActiveWellnessChallenge(): Promise<WellnessChallenge | undefined>;
  getWellnessChallenge(id: number): Promise<WellnessChallenge | undefined>;
  createWellnessChallenge(challenge: InsertWellnessChallenge): Promise<WellnessChallenge>;

  // Challenge participation
  getChallengeParticipation(userId: number, challengeId: number): Promise<ChallengeParticipation | undefined>;
  createChallengeParticipation(participation: InsertChallengeParticipation): Promise<ChallengeParticipation>;
  updateChallengeScore(participationId: number, activityType: string, points: number): Promise<ChallengeParticipation | undefined>;
  getChallengeLeaderboard(challengeId: number): Promise<ChallengeParticipation[]>;

  // Challenge activities
  getChallengeActivities(participationId: number): Promise<ChallengeActivity[]>;
  createChallengeActivity(activity: InsertChallengeActivity): Promise<ChallengeActivity>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private appointments: Map<number, Appointment>;
  private fitnessClasses: Map<number, FitnessClass>;
  private classRegistrations: Map<number, ClassRegistration>;
  private menuItems: Map<number, MenuItem>;
  private storeProducts: Map<number, StoreProduct>;
  private cartItems: Map<number, CartItem>;
  private healthMetrics: Map<number, HealthMetric>;
  private dailyHealthLogs: Map<string, DailyHealthLog>; // key: userId-date
  private progressData: Map<number, ProgressData>;
  private loyaltyPrograms: Map<number, LoyaltyProgram>;
  private loyaltyTransactions: Map<number, LoyaltyTransaction>;
  private loyaltyRewards: Map<number, LoyaltyReward>;
  private userRewards: Map<number, UserReward>;
  private wellnessChallenges: Map<number, WellnessChallenge>;
  private challengeParticipations: Map<number, ChallengeParticipation>;
  private challengeActivities: Map<number, ChallengeActivity>;
  
  private userIdCounter: number = 1;
  private appointmentIdCounter: number = 1;
  private fitnessClassIdCounter: number = 1;
  private classRegistrationIdCounter: number = 1;
  private menuItemIdCounter: number = 1;
  private storeProductIdCounter: number = 1;
  private cartItemIdCounter: number = 1;
  private healthMetricIdCounter: number = 1;
  private progressDataIdCounter: number = 1;
  private loyaltyProgramIdCounter: number = 1;
  private loyaltyTransactionIdCounter: number = 1;
  private loyaltyRewardIdCounter: number = 1;
  private userRewardIdCounter: number = 1;
  private wellnessChallengeIdCounter: number = 1;
  private challengeParticipationIdCounter: number = 1;
  private challengeActivityIdCounter: number = 1;

  constructor() {
    this.users = new Map();
    this.appointments = new Map();
    this.fitnessClasses = new Map();
    this.classRegistrations = new Map();
    this.menuItems = new Map();
    this.storeProducts = new Map();
    this.cartItems = new Map();
    this.healthMetrics = new Map();
    this.dailyHealthLogs = new Map();
    this.progressData = new Map();
    this.loyaltyPrograms = new Map();
    this.loyaltyTransactions = new Map();
    this.loyaltyRewards = new Map();
    this.userRewards = new Map();
    this.wellnessChallenges = new Map();
    this.challengeParticipations = new Map();
    this.challengeActivities = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create fitness classes
    const sampleClasses: InsertFitnessClass[] = [
      {
        className: 'Power Yoga',
        instructor: 'Emma Taylor',
        description: 'A dynamic, fitness-based approach to vinyasa-style yoga.',
        day: 'Today',
        time: '5:30 PM',
        duration: 60,
        capacity: 20,
        currentRegistered: 5,
        imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a'
      },
      {
        className: 'HIIT Circuit',
        instructor: 'Marcus Johnson',
        description: 'High-intensity interval training for maximum calorie burn.',
        day: 'Tomorrow',
        time: '6:15 AM',
        duration: 45,
        capacity: 15,
        currentRegistered: 10,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b'
      },
      {
        className: 'Strength Training',
        instructor: 'David Kim',
        description: 'Build muscle and increase strength with this comprehensive workout.',
        day: 'Wednesday',
        time: '4:00 PM',
        duration: 60,
        capacity: 20,
        currentRegistered: 10,
        imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48'
      }
    ];
    
    sampleClasses.forEach(classData => this.createFitnessClass(classData));

    // Create menu items
    const sampleMenuItems: InsertMenuItem[] = [
      {
        name: 'Jollof Rice Bowl',
        description: 'Traditional West African spiced rice with grilled chicken, plantains, and fresh vegetables.',
        price: 1500,
        category: 'main',
        imageUrl: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26',
        tags: ['African Heritage', 'High Protein'],
        nutritionalInfo: { calories: 480, protein: 28, carbs: 52, fat: 18 }
      },
      {
        name: 'Thieboudienne (Senegalese Fish & Rice)',
        description: 'Traditional Senegalese dish with fresh fish, vegetables, and aromatic spiced rice.',
        price: 1800,
        category: 'main',
        imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975',
        tags: ['African Heritage', 'High Protein', 'Omega-3'],
        nutritionalInfo: { calories: 520, protein: 32, carbs: 48, fat: 20 }
      },
      {
        name: 'Fufu with Peanut Stew',
        description: 'Traditional cassava and plantain fufu served with rich peanut groundnut stew and greens.',
        price: 1400,
        category: 'main',
        imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7be1',
        tags: ['African Heritage', 'Vegan', 'High Fiber'],
        nutritionalInfo: { calories: 450, protein: 16, carbs: 58, fat: 18 }
      },
      {
        name: 'Mandingo Wellness Bowl',
        description: 'Millet couscous with grilled fish, okra, sweet potato, and baobab leaf sauce.',
        price: 1600,
        category: 'main',
        imageUrl: 'https://images.unsplash.com/photo-1563379091339-03246963d7d3',
        tags: ['African Heritage', 'Superfood', 'Gluten-Free'],
        nutritionalInfo: { calories: 490, protein: 26, carbs: 54, fat: 16 }
      },
      {
        name: 'Bissap Hibiscus Bowl',
        description: 'Refreshing hibiscus-infused quinoa with grilled vegetables and ginger-lime dressing.',
        price: 1300,
        category: 'main',
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999',
        tags: ['African Heritage', 'Antioxidant', 'Vegan'],
        nutritionalInfo: { calories: 380, protein: 12, carbs: 48, fat: 14 }
      },
      {
        name: 'Kelewele Power Plate',
        description: 'Spiced plantain with black-eyed pea fritters, avocado, and palm nut sauce.',
        price: 1200,
        category: 'main',
        imageUrl: 'https://images.unsplash.com/photo-1601137162717-c83fd4e31efe',
        tags: ['African Heritage', 'Plant-Based', 'High Fiber'],
        nutritionalInfo: { calories: 420, protein: 14, carbs: 62, fat: 16 }
      },
      {
        name: 'Avocado & Quinoa Power Bowl',
        description: 'Nutrient-rich quinoa, avocado, roasted vegetables, and tahini dressing.',
        price: 1400,
        category: 'main',
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999',
        tags: ['Vegan', 'Gluten-Free'],
        nutritionalInfo: { calories: 450, protein: 12, carbs: 48, fat: 22 }
      },
      {
        name: 'Wild-Caught Salmon Plate',
        description: 'Omega-rich salmon with seasonal vegetables and herbed quinoa.',
        price: 1800,
        category: 'main',
        imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
        tags: ['High Protein', 'Gluten-Free'],
        nutritionalInfo: { calories: 520, protein: 32, carbs: 38, fat: 24 }
      },
      {
        name: 'Potato Greens with Rice',
        description: 'Traditional West African potato leaves stewed with palm oil, fish, and spices, served over jasmine rice.',
        price: 1400,
        category: 'main',
        imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7be1',
        tags: ['African Heritage', 'High Iron', 'Traditional'],
        nutritionalInfo: { calories: 460, protein: 22, carbs: 56, fat: 16 }
      },
      {
        name: 'Cassava Leaves with Rice',
        description: 'Nutrient-rich cassava leaves slow-cooked with smoked fish, meat, and traditional seasonings over steamed rice.',
        price: 1500,
        category: 'main',
        imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975',
        tags: ['African Heritage', 'High Protein', 'Iron-Rich'],
        nutritionalInfo: { calories: 490, protein: 26, carbs: 52, fat: 18 }
      },
      {
        name: 'Mediterranean Bowl',
        description: 'Chickpeas, cucumber, tomato, feta, olives, and lemon-herb vinaigrette.',
        price: 1200,
        category: 'main',
        imageUrl: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf',
        tags: ['Vegetarian', 'High Fiber'],
        nutritionalInfo: { calories: 380, protein: 14, carbs: 42, fat: 18 }
      }
    ];
    
    sampleMenuItems.forEach(menuItem => {
      const id = this.menuItemIdCounter++;
      this.menuItems.set(id, { ...menuItem, id });
    });

    // Create store products
    const sampleProducts: InsertStoreProduct[] = [
      {
        name: 'Organic Superfood Blend',
        description: 'Nutrient-rich powder blend',
        price: 2499,
        category: 'supplements',
        imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf',
        inStock: true,
        tags: ['Organic', 'Superfood']
      },
      {
        name: 'Organic Berry Mix',
        description: 'Fresh seasonal berries',
        price: 899,
        category: 'produce',
        imageUrl: 'https://pixabay.com/get/gf022cac75845b3fd9cb12ea3963c2f7e06a6ada9b248b80be3cd75f78f6eefd4584abc17940c8ba645899f78f75b57c74af4c0cf16aaeff659f8a02d91361d04_1280.jpg',
        inStock: true,
        tags: ['Organic', 'Fresh']
      },
      {
        name: 'Cold-Pressed Juice Pack',
        description: '3-day detox program',
        price: 3250,
        category: 'beverages',
        imageUrl: 'https://images.unsplash.com/photo-1506617564039-2f3b650b7010',
        inStock: true,
        tags: ['Cold-Pressed', 'Detox']
      },
      {
        name: 'Organic Nut Butter',
        description: 'Almond & cashew blend',
        price: 1299,
        category: 'pantry',
        imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
        inStock: true,
        tags: ['Organic', 'High Protein']
      }
    ];
    
    sampleProducts.forEach(product => {
      const id = this.storeProductIdCounter++;
      this.storeProducts.set(id, { ...product, id });
    });

    // Create sample loyalty rewards
    const sampleRewards: InsertLoyaltyReward[] = [
      {
        name: '10% Off Next Meal',
        description: 'Get 10% discount on your next restaurant order',
        category: 'restaurant',
        pointsCost: 100,
        discountPercent: 10,
        discountAmount: null,
        tierRequirement: 1,
        isActive: true,
        expiryDays: 30,
        usageLimit: 1
      },
      {
        name: 'Free Fitness Class',
        description: 'Complimentary access to any fitness class',
        category: 'fitness',
        pointsCost: 250,
        discountPercent: null,
        discountAmount: 25,
        tierRequirement: 1,
        isActive: true,
        expiryDays: 30,
        usageLimit: 1
      },
      {
        name: 'Free Health Assessment',
        description: 'Complimentary basic health screening',
        category: 'clinic',
        pointsCost: 500,
        discountPercent: null,
        discountAmount: 50,
        tierRequirement: 2,
        isActive: true,
        expiryDays: 30,
        usageLimit: 1
      },
      {
        name: '20% Off Store Purchase',
        description: 'Get 20% off any store product',
        category: 'store',
        pointsCost: 400,
        discountPercent: 20,
        discountAmount: null,
        tierRequirement: 2,
        isActive: true,
        expiryDays: 30,
        usageLimit: 1
      },
      {
        name: 'Free Telehealth Consultation',
        description: 'Complimentary telehealth consultation with our specialists',
        category: 'telehealth',
        pointsCost: 750,
        discountPercent: null,
        discountAmount: 75,
        tierRequirement: 3,
        isActive: true,
        expiryDays: 30,
        usageLimit: 1
      },
      {
        name: 'VIP Wellness Package',
        description: 'Complete wellness package with all services included',
        category: 'premium',
        pointsCost: 2000,
        discountPercent: null,
        discountAmount: 200,
        tierRequirement: 4,
        isActive: true,
        expiryDays: 60,
        usageLimit: 1
      }
    ];

    sampleRewards.forEach(reward => {
      const id = this.loyaltyRewardIdCounter++;
      const createdAt = new Date();
      this.loyaltyRewards.set(id, { ...reward, id, createdAt });
    });

    // Create sample wellness challenge
    const currentDate = new Date();
    const challenge: WellnessChallenge = {
      id: 1,
      title: "Winter Wellness Challenge 2025",
      description: "Complete activities across all KeneYoro services to boost your winter wellness! Earn points for gym visits, healthy meals, clinic check-ins, and health product purchases.",
      season: "winter",
      year: 2025,
      startDate: new Date(2025, 0, 1), // January 1, 2025
      endDate: new Date(2025, 2, 31), // March 31, 2025
      isActive: true,
      pointsReward: 500,
      createdAt: currentDate
    };
    this.wellnessChallenges.set(1, challenge);
    this.wellnessChallengeIdCounter = 2;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }

  // Appointment methods
  async getAppointments(userId: number): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).filter(appointment => appointment.userId === userId);
  }
  
  async getAppointment(id: number): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }
  
  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = this.appointmentIdCounter++;
    const createdAt = new Date();
    const appointment: Appointment = { ...insertAppointment, id, createdAt };
    this.appointments.set(id, appointment);
    return appointment;
  }
  
  async updateAppointment(id: number, status: string): Promise<Appointment | undefined> {
    const appointment = this.appointments.get(id);
    if (!appointment) return undefined;
    
    const updatedAppointment = { ...appointment, status };
    this.appointments.set(id, updatedAppointment);
    return updatedAppointment;
  }

  // Fitness class methods
  async getFitnessClasses(): Promise<FitnessClass[]> {
    return Array.from(this.fitnessClasses.values());
  }
  
  async getFitnessClass(id: number): Promise<FitnessClass | undefined> {
    return this.fitnessClasses.get(id);
  }
  
  async createFitnessClass(insertFitnessClass: InsertFitnessClass): Promise<FitnessClass> {
    const id = this.fitnessClassIdCounter++;
    const fitnessClass: FitnessClass = { ...insertFitnessClass, id };
    this.fitnessClasses.set(id, fitnessClass);
    return fitnessClass;
  }

  // Class registration methods
  async getClassRegistrations(userId: number): Promise<ClassRegistration[]> {
    return Array.from(this.classRegistrations.values()).filter(registration => registration.userId === userId);
  }
  
  async createClassRegistration(insertRegistration: InsertClassRegistration): Promise<ClassRegistration> {
    const id = this.classRegistrationIdCounter++;
    const registeredAt = new Date();
    const registration: ClassRegistration = { ...insertRegistration, id, registeredAt };
    this.classRegistrations.set(id, registration);
    
    // Update the class current registered count
    const fitnessClass = this.fitnessClasses.get(insertRegistration.classId);
    if (fitnessClass) {
      const updatedClass = { 
        ...fitnessClass, 
        currentRegistered: fitnessClass.currentRegistered + 1 
      };
      this.fitnessClasses.set(fitnessClass.id, updatedClass);
    }
    
    return registration;
  }
  
  async deleteClassRegistration(userId: number, classId: number): Promise<boolean> {
    const registration = Array.from(this.classRegistrations.values()).find(
      reg => reg.userId === userId && reg.classId === classId
    );
    
    if (!registration) return false;
    
    this.classRegistrations.delete(registration.id);
    
    // Update the class current registered count
    const fitnessClass = this.fitnessClasses.get(classId);
    if (fitnessClass) {
      const updatedClass = { 
        ...fitnessClass, 
        currentRegistered: Math.max(0, fitnessClass.currentRegistered - 1)
      };
      this.fitnessClasses.set(classId, updatedClass);
    }
    
    return true;
  }

  // Menu methods
  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }
  
  async getMenuItem(id: number): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  // Store methods
  async getStoreProducts(): Promise<StoreProduct[]> {
    return Array.from(this.storeProducts.values());
  }
  
  async getStoreProduct(id: number): Promise<StoreProduct | undefined> {
    return this.storeProducts.get(id);
  }

  // Cart methods
  async getCartItems(userId: number): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.userId === userId);
  }
  
  async getCartItem(id: number): Promise<CartItem | undefined> {
    return this.cartItems.get(id);
  }
  
  async createCartItem(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if the item is already in the cart
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.userId === insertCartItem.userId && item.productId === insertCartItem.productId
    );
    
    if (existingItem) {
      return this.updateCartItem(existingItem.id, existingItem.quantity + insertCartItem.quantity) as Promise<CartItem>;
    }
    
    const id = this.cartItemIdCounter++;
    const addedAt = new Date();
    const cartItem: CartItem = { ...insertCartItem, id, addedAt };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }
  
  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    const updatedCartItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedCartItem);
    return updatedCartItem;
  }
  
  async deleteCartItem(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  // Health metrics methods
  async getHealthMetrics(userId: number): Promise<HealthMetric[]> {
    return Array.from(this.healthMetrics.values()).filter(metric => metric.userId === userId);
  }
  
  async createHealthMetric(insertHealthMetric: InsertHealthMetric): Promise<HealthMetric> {
    const id = this.healthMetricIdCounter++;
    const date = new Date();
    const healthMetric: HealthMetric = { ...insertHealthMetric, id, date };
    this.healthMetrics.set(id, healthMetric);
    return healthMetric;
  }

  // Progress data methods
  async getProgressData(userId: number): Promise<ProgressData[]> {
    return Array.from(this.progressData.values()).filter(data => data.userId === userId);
  }
  
  async createProgressData(insertProgressData: InsertProgressData): Promise<ProgressData> {
    const id = this.progressDataIdCounter++;
    const date = new Date();
    const progressData: ProgressData = { ...insertProgressData, id, date };
    this.progressData.set(id, progressData);
    return progressData;
  }

  // Loyalty Program Methods
  async getLoyaltyProgram(userId: number): Promise<LoyaltyProgram | undefined> {
    return Array.from(this.loyaltyPrograms.values()).find(program => program.userId === userId);
  }

  async createLoyaltyProgram(insertProgram: InsertLoyaltyProgram): Promise<LoyaltyProgram> {
    const id = this.loyaltyProgramIdCounter++;
    const joinedAt = new Date();
    const lastActivity = new Date();
    const program: LoyaltyProgram = { ...insertProgram, id, joinedAt, lastActivity };
    this.loyaltyPrograms.set(id, program);
    return program;
  }

  async updateLoyaltyPoints(userId: number, pointsChange: number, lifetimeSpentChange: number = 0): Promise<LoyaltyProgram | undefined> {
    let program = await this.getLoyaltyProgram(userId);
    
    if (!program) {
      // Create new loyalty program for user
      program = await this.createLoyaltyProgram({
        userId,
        totalPoints: Math.max(0, pointsChange),
        currentTierLevel: 1,
        lifetimeSpent: Math.max(0, lifetimeSpentChange)
      });
    } else {
      // Update existing program
      const newPoints = Math.max(0, program.totalPoints + pointsChange);
      const newLifetimeSpent = program.lifetimeSpent + lifetimeSpentChange;
      
      // Calculate tier level based on lifetime spent
      let newTierLevel = 1;
      if (newLifetimeSpent >= 50000) newTierLevel = 4; // Platinum: $500+
      else if (newLifetimeSpent >= 25000) newTierLevel = 3; // Gold: $250+
      else if (newLifetimeSpent >= 10000) newTierLevel = 2; // Silver: $100+
      
      const updatedProgram: LoyaltyProgram = {
        ...program,
        totalPoints: newPoints,
        currentTierLevel: newTierLevel,
        lifetimeSpent: newLifetimeSpent,
        lastActivity: new Date()
      };
      
      this.loyaltyPrograms.set(program.id, updatedProgram);
      return updatedProgram;
    }
    
    return program;
  }

  async getLoyaltyTransactions(userId: number): Promise<LoyaltyTransaction[]> {
    return Array.from(this.loyaltyTransactions.values())
      .filter(transaction => transaction.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async createLoyaltyTransaction(insertTransaction: InsertLoyaltyTransaction): Promise<LoyaltyTransaction> {
    const id = this.loyaltyTransactionIdCounter++;
    const createdAt = new Date();
    const transaction: LoyaltyTransaction = { ...insertTransaction, id, createdAt };
    this.loyaltyTransactions.set(id, transaction);
    return transaction;
  }

  async getLoyaltyRewards(): Promise<LoyaltyReward[]> {
    return Array.from(this.loyaltyRewards.values()).filter(reward => reward.isActive);
  }

  async getLoyaltyRewardsByTier(tierLevel: number): Promise<LoyaltyReward[]> {
    return Array.from(this.loyaltyRewards.values())
      .filter(reward => reward.isActive && reward.tierRequirement <= tierLevel);
  }

  async createLoyaltyReward(insertReward: InsertLoyaltyReward): Promise<LoyaltyReward> {
    const id = this.loyaltyRewardIdCounter++;
    const createdAt = new Date();
    const reward: LoyaltyReward = { ...insertReward, id, createdAt };
    this.loyaltyRewards.set(id, reward);
    return reward;
  }

  async getUserRewards(userId: number): Promise<UserReward[]> {
    return Array.from(this.userRewards.values())
      .filter(userReward => userReward.userId === userId && !userReward.isUsed)
      .filter(userReward => userReward.expiresAt > new Date());
  }

  async redeemReward(userId: number, rewardId: number): Promise<UserReward> {
    const id = this.userRewardIdCounter++;
    const redeemedAt = new Date();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days expiry
    
    const userReward: UserReward = {
      id,
      userId,
      rewardId,
      redeemedAt,
      usedAt: null,
      expiresAt,
      isUsed: false,
      usageCount: 0
    };
    
    this.userRewards.set(id, userReward);
    return userReward;
  }

  async useReward(userRewardId: number): Promise<UserReward | undefined> {
    const userReward = this.userRewards.get(userRewardId);
    if (!userReward || userReward.isUsed) return undefined;
    
    const updatedReward: UserReward = {
      ...userReward,
      usedAt: new Date(),
      isUsed: true,
      usageCount: userReward.usageCount + 1
    };
    
    this.userRewards.set(userRewardId, updatedReward);
    return updatedReward;
  }

  // Wellness Challenge methods
  async getWellnessChallenges(): Promise<WellnessChallenge[]> {
    return Array.from(this.wellnessChallenges.values());
  }

  async getActiveWellnessChallenge(): Promise<WellnessChallenge | undefined> {
    const now = new Date();
    return Array.from(this.wellnessChallenges.values())
      .find(challenge => challenge.isActive && challenge.startDate <= now && challenge.endDate >= now);
  }

  async getWellnessChallenge(id: number): Promise<WellnessChallenge | undefined> {
    return this.wellnessChallenges.get(id);
  }

  async createWellnessChallenge(insertChallenge: InsertWellnessChallenge): Promise<WellnessChallenge> {
    const id = this.wellnessChallengeIdCounter++;
    const createdAt = new Date();
    const challenge: WellnessChallenge = { ...insertChallenge, id, createdAt };
    this.wellnessChallenges.set(id, challenge);
    return challenge;
  }

  // Challenge Participation methods
  async getChallengeParticipation(userId: number, challengeId: number): Promise<ChallengeParticipation | undefined> {
    return Array.from(this.challengeParticipations.values())
      .find(participation => participation.userId === userId && participation.challengeId === challengeId);
  }

  async createChallengeParticipation(insertParticipation: InsertChallengeParticipation): Promise<ChallengeParticipation> {
    const id = this.challengeParticipationIdCounter++;
    const joinedAt = new Date();
    const participation: ChallengeParticipation = { 
      ...insertParticipation, 
      id, 
      joinedAt,
      totalScore: 0,
      gymVisits: 0,
      healthyMeals: 0,
      clinicCheckins: 0,
      storeHealthPurchases: 0,
      isCompleted: false
    };
    this.challengeParticipations.set(id, participation);
    return participation;
  }

  async updateChallengeScore(participationId: number, activityType: string, points: number): Promise<ChallengeParticipation | undefined> {
    const participation = this.challengeParticipations.get(participationId);
    if (!participation) return undefined;

    const updatedParticipation: ChallengeParticipation = {
      ...participation,
      totalScore: participation.totalScore + points,
      gymVisits: activityType === 'gym_visit' ? participation.gymVisits + 1 : participation.gymVisits,
      healthyMeals: activityType === 'healthy_meal' ? participation.healthyMeals + 1 : participation.healthyMeals,
      clinicCheckins: activityType === 'clinic_checkin' ? participation.clinicCheckins + 1 : participation.clinicCheckins,
      storeHealthPurchases: activityType === 'store_purchase' ? participation.storeHealthPurchases + 1 : participation.storeHealthPurchases
    };

    this.challengeParticipations.set(participationId, updatedParticipation);
    return updatedParticipation;
  }

  async getChallengeLeaderboard(challengeId: number): Promise<ChallengeParticipation[]> {
    return Array.from(this.challengeParticipations.values())
      .filter(participation => participation.challengeId === challengeId)
      .sort((a, b) => b.totalScore - a.totalScore);
  }

  // Challenge Activity methods
  async getChallengeActivities(participationId: number): Promise<ChallengeActivity[]> {
    return Array.from(this.challengeActivities.values())
      .filter(activity => activity.participationId === participationId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createChallengeActivity(insertActivity: InsertChallengeActivity): Promise<ChallengeActivity> {
    const id = this.challengeActivityIdCounter++;
    const createdAt = new Date();
    const activity: ChallengeActivity = { ...insertActivity, id, createdAt };
    this.challengeActivities.set(id, activity);
    return activity;
  }
}

export const storage = new MemStorage();
