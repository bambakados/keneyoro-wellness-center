import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import MemoryStore from "memorystore";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { insertUserSchema, insertAppointmentSchema, insertClassRegistrationSchema, insertCartItemSchema } from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcrypt";

const SessionStore = MemoryStore(session);

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up session store
  app.use(
    session({
      cookie: { maxAge: 86400000 }, // 24 hours
      store: new SessionStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET || "healthhub-secret",
    })
  );

  // Set up passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure passport local strategy
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        
        // In a real app, use bcrypt.compare instead
        // For simplicity, we'll check direct comparison here
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password." });
        }
        
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  // Serialize/deserialize user
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // Auth routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username or email already exists
      const existingUsername = await storage.getUserByUsername(userData.username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }
      
      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already in use" });
      }
      
      // In a real app, hash the password
      // const hashedPassword = await bcrypt.hash(userData.password, 10);
      // const secureUserData = { ...userData, password: hashedPassword };
      
      const newUser = await storage.createUser(userData);
      const { password, ...userWithoutPassword } = newUser;
      
      // Log in the user
      req.login(newUser, (err) => {
        if (err) {
          return res.status(500).json({ message: "Error logging in" });
        }
        return res.status(201).json({ user: userWithoutPassword });
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ errors: err.errors });
      }
      return res.status(500).json({ message: "Error creating user" });
    }
  });

  app.post("/api/auth/login", passport.authenticate("local"), (req: Request, res: Response) => {
    const { password, ...userWithoutPassword } = req.user as any;
    res.json({ user: userWithoutPassword });
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.logout(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/auth/me", (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const { password, ...userWithoutPassword } = req.user as any;
    res.json({ user: userWithoutPassword });
  });

  // Middleware to check if user is authenticated
  const isAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Not authenticated" });
  };

  // Appointment routes
  app.get("/api/appointments", isAuthenticated, async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const appointments = await storage.getAppointments(userId);
    res.json({ appointments });
  });

  app.post("/api/appointments", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = (req.user as any).id;
      const appointmentData = insertAppointmentSchema.parse({
        ...req.body,
        userId,
        status: "confirmed"
      });
      
      const newAppointment = await storage.createAppointment(appointmentData);
      res.status(201).json({ appointment: newAppointment });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ errors: err.errors });
      }
      return res.status(500).json({ message: "Error creating appointment" });
    }
  });

  // Fitness class routes
  app.get("/api/fitness-classes", async (req: Request, res: Response) => {
    const classes = await storage.getFitnessClasses();
    res.json({ classes });
  });

  app.post("/api/fitness-classes/:id/register", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = (req.user as any).id;
      const classId = parseInt(req.params.id);
      
      // Check if class exists
      const fitnessClass = await storage.getFitnessClass(classId);
      if (!fitnessClass) {
        return res.status(404).json({ message: "Fitness class not found" });
      }
      
      // Check if class is full
      if (fitnessClass.currentRegistered >= fitnessClass.capacity) {
        return res.status(400).json({ message: "Class is full" });
      }
      
      const registrationData = insertClassRegistrationSchema.parse({
        userId,
        classId
      });
      
      const newRegistration = await storage.createClassRegistration(registrationData);
      res.status(201).json({ registration: newRegistration });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ errors: err.errors });
      }
      return res.status(500).json({ message: "Error registering for class" });
    }
  });

  // Menu routes
  app.get("/api/menu", async (req: Request, res: Response) => {
    const menuItems = await storage.getMenuItems();
    res.json({ menuItems });
  });

  // Store routes
  app.get("/api/store", async (req: Request, res: Response) => {
    const products = await storage.getStoreProducts();
    res.json({ products });
  });

  // Cart routes
  app.get("/api/cart", isAuthenticated, async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const cartItems = await storage.getCartItems(userId);
    
    // Fetch product details for each cart item
    const itemsWithDetails = await Promise.all(
      cartItems.map(async (item) => {
        const product = await storage.getStoreProduct(item.productId);
        return {
          ...item,
          product
        };
      })
    );
    
    res.json({ cartItems: itemsWithDetails });
  });

  app.post("/api/cart", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = (req.user as any).id;
      const cartItemData = insertCartItemSchema.parse({
        ...req.body,
        userId
      });
      
      // Check if product exists
      const product = await storage.getStoreProduct(cartItemData.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      const newCartItem = await storage.createCartItem(cartItemData);
      res.status(201).json({ cartItem: newCartItem });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ errors: err.errors });
      }
      return res.status(500).json({ message: "Error adding to cart" });
    }
  });

  app.put("/api/cart/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const userId = (req.user as any).id;
      
      // Check if cart item exists and belongs to user
      const cartItem = await storage.getCartItem(id);
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      if (cartItem.userId !== userId) {
        return res.status(403).json({ message: "Not authorized" });
      }
      
      const { quantity } = req.body;
      if (typeof quantity !== "number" || quantity < 1) {
        return res.status(400).json({ message: "Invalid quantity" });
      }
      
      const updatedCartItem = await storage.updateCartItem(id, quantity);
      res.json({ cartItem: updatedCartItem });
    } catch (err) {
      return res.status(500).json({ message: "Error updating cart item" });
    }
  });

  app.delete("/api/cart/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const userId = (req.user as any).id;
      
      // Check if cart item exists and belongs to user
      const cartItem = await storage.getCartItem(id);
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      if (cartItem.userId !== userId) {
        return res.status(403).json({ message: "Not authorized" });
      }
      
      await storage.deleteCartItem(id);
      res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ message: "Error removing cart item" });
    }
  });

  // Loyalty Program Routes
  app.get("/api/loyalty/program", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = (req.user as any).id;
      const loyaltyProgram = await storage.getLoyaltyProgram(userId);
      
      if (!loyaltyProgram) {
        // Create new loyalty program for user
        const newProgram = await storage.createLoyaltyProgram({
          userId,
          totalPoints: 0,
          currentTierLevel: 1,
          lifetimeSpent: 0
        });
        return res.json({ loyaltyProgram: newProgram });
      }
      
      res.json({ loyaltyProgram });
    } catch (err) {
      return res.status(500).json({ message: "Error fetching loyalty program" });
    }
  });

  app.get("/api/loyalty/rewards", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = (req.user as any).id;
      const loyaltyProgram = await storage.getLoyaltyProgram(userId);
      const tierLevel = loyaltyProgram?.currentTierLevel || 1;
      
      const availableRewards = await storage.getLoyaltyRewardsByTier(tierLevel);
      const userRewards = await storage.getUserRewards(userId);
      
      res.json({ 
        availableRewards,
        userRewards,
        currentTier: tierLevel,
        totalPoints: loyaltyProgram?.totalPoints || 0
      });
    } catch (err) {
      return res.status(500).json({ message: "Error fetching rewards" });
    }
  });

  app.post("/api/loyalty/redeem/:rewardId", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = (req.user as any).id;
      const rewardId = parseInt(req.params.rewardId);
      
      const loyaltyProgram = await storage.getLoyaltyProgram(userId);
      if (!loyaltyProgram) {
        return res.status(400).json({ message: "No loyalty program found" });
      }
      
      const availableRewards = await storage.getLoyaltyRewardsByTier(loyaltyProgram.currentTierLevel);
      const reward = availableRewards.find(r => r.id === rewardId);
      
      if (!reward) {
        return res.status(404).json({ message: "Reward not available for your tier" });
      }
      
      if (loyaltyProgram.totalPoints < reward.pointsCost) {
        return res.status(400).json({ message: "Insufficient points" });
      }
      
      // Deduct points and create user reward
      await storage.updateLoyaltyPoints(userId, -reward.pointsCost);
      const userReward = await storage.redeemReward(userId, rewardId);
      
      // Create transaction record
      await storage.createLoyaltyTransaction({
        userId,
        pointsEarned: 0,
        pointsRedeemed: reward.pointsCost,
        transactionType: 'redemption',
        serviceDetails: `Redeemed: ${reward.name}`,
        relatedOrderId: userReward.id
      });
      
      res.json({ userReward, message: "Reward redeemed successfully!" });
    } catch (err) {
      return res.status(500).json({ message: "Error redeeming reward" });
    }
  });

  app.get("/api/loyalty/transactions", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = (req.user as any).id;
      const transactions = await storage.getLoyaltyTransactions(userId);
      res.json({ transactions });
    } catch (err) {
      return res.status(500).json({ message: "Error fetching transactions" });
    }
  });

  app.post("/api/loyalty/earn", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = (req.user as any).id;
      const { points, serviceType, serviceDetails, amountSpent } = req.body;
      
      if (!points || !serviceType || !serviceDetails) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      // Update loyalty points
      const updatedProgram = await storage.updateLoyaltyPoints(userId, points, amountSpent || 0);
      
      // Create transaction record
      await storage.createLoyaltyTransaction({
        userId,
        pointsEarned: points,
        pointsRedeemed: 0,
        transactionType: serviceType,
        serviceDetails,
        relatedOrderId: null
      });
      
      res.json({ 
        loyaltyProgram: updatedProgram,
        pointsEarned: points,
        message: `You earned ${points} points!`
      });
    } catch (err) {
      return res.status(500).json({ message: "Error earning points" });
    }
  });

  // Health Tracking Routes
  app.get("/api/health/daily-logs", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = (req.user as any).id;
      
      // Return sample health data for demonstration
      const sampleLogs = [
        {
          id: 1,
          userId,
          date: "2025-01-23",
          steps: 8500,
          caloriesBurned: 320,
          waterIntake: 56,
          sleepHours: 7,
          moodScore: 8,
          energyLevel: 7,
          stressLevel: 3,
          workoutMinutes: 45,
          meditationMinutes: 10,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          userId,
          date: "2025-01-22",
          steps: 9200,
          caloriesBurned: 380,
          waterIntake: 64,
          sleepHours: 8,
          moodScore: 9,
          energyLevel: 8,
          stressLevel: 2,
          workoutMinutes: 60,
          meditationMinutes: 15,
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          userId,
          date: "2025-01-21",
          steps: 10500,
          caloriesBurned: 450,
          waterIntake: 72,
          sleepHours: 7.5,
          moodScore: 8,
          energyLevel: 9,
          stressLevel: 2,
          workoutMinutes: 75,
          meditationMinutes: 20,
          createdAt: new Date().toISOString()
        }
      ];
      
      res.json(sampleLogs);
    } catch (err) {
      return res.status(500).json({ message: "Error fetching health logs" });
    }
  });

  app.post("/api/health/daily-logs", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = (req.user as any).id;
      const logData = req.body;
      
      // For demo purposes, return success response
      const newLog = {
        id: Date.now(),
        userId,
        ...logData,
        createdAt: new Date().toISOString()
      };
      
      res.json(newLog);
    } catch (err) {
      return res.status(500).json({ message: "Error saving health log" });
    }
  });

  app.get("/api/health/metrics", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = (req.user as any).id;
      
      // Return sample health metrics for demonstration
      const sampleMetrics = [
        {
          id: 1,
          userId,
          metricType: "vitals",
          metricName: "heart_rate",
          value: 72,
          unit: "bpm",
          date: new Date().toISOString(),
          notes: "Resting heart rate after morning workout"
        },
        {
          id: 2,
          userId,
          metricType: "fitness",
          metricName: "weight",
          value: 165,
          unit: "lbs",
          date: new Date().toISOString(),
          notes: "Morning weight measurement"
        }
      ];
      
      res.json(sampleMetrics);
    } catch (err) {
      return res.status(500).json({ message: "Error fetching health metrics" });
    }
  });

  // Wellness Challenge Routes
  app.get("/api/wellness-challenges", async (req: Request, res: Response) => {
    try {
      const challenges = await storage.getWellnessChallenges();
      res.json({ challenges });
    } catch (error) {
      console.error("Error fetching wellness challenges:", error);
      res.status(500).json({ error: "Failed to fetch wellness challenges" });
    }
  });

  app.get("/api/wellness-challenges/active", async (req: Request, res: Response) => {
    try {
      const activeChallenge = await storage.getActiveWellnessChallenge();
      res.json({ challenge: activeChallenge });
    } catch (error) {
      console.error("Error fetching active wellness challenge:", error);
      res.status(500).json({ error: "Failed to fetch active wellness challenge" });
    }
  });

  app.post("/api/wellness-challenges/:id/join", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const challengeId = parseInt(req.params.id);
      const userId = (req.user as any).id;

      // Check if user is already participating
      const existingParticipation = await storage.getChallengeParticipation(userId, challengeId);
      if (existingParticipation) {
        return res.status(400).json({ error: "Already participating in this challenge" });
      }

      const participation = await storage.createChallengeParticipation({
        userId,
        challengeId
      });

      res.json({ participation });
    } catch (error) {
      console.error("Error joining wellness challenge:", error);
      res.status(500).json({ error: "Failed to join wellness challenge" });
    }
  });

  app.get("/api/wellness-challenges/:id/leaderboard", async (req: Request, res: Response) => {
    try {
      const challengeId = parseInt(req.params.id);
      const leaderboard = await storage.getChallengeLeaderboard(challengeId);
      
      // Get user details for leaderboard
      const leaderboardWithUsers = await Promise.all(
        leaderboard.map(async (participation) => {
          const user = await storage.getUser(participation.userId);
          return {
            ...participation,
            user: user ? { fullName: user.fullName, profileImage: user.profileImage } : null
          };
        })
      );

      res.json({ leaderboard: leaderboardWithUsers });
    } catch (error) {
      console.error("Error fetching challenge leaderboard:", error);
      res.status(500).json({ error: "Failed to fetch challenge leaderboard" });
    }
  });

  app.get("/api/wellness-challenges/my-participation", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = (req.user as any).id;
      const activeChallenge = await storage.getActiveWellnessChallenge();
      
      if (!activeChallenge) {
        return res.json({ participation: null });
      }

      const participation = await storage.getChallengeParticipation(userId, activeChallenge.id);
      res.json({ participation, challenge: activeChallenge });
    } catch (error) {
      console.error("Error fetching user challenge participation:", error);
      res.status(500).json({ error: "Failed to fetch challenge participation" });
    }
  });

  app.post("/api/wellness-challenges/record-activity", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { activityType, description } = req.body;
      const userId = (req.user as any).id;

      const activeChallenge = await storage.getActiveWellnessChallenge();
      if (!activeChallenge) {
        return res.status(400).json({ error: "No active challenge found" });
      }

      const participation = await storage.getChallengeParticipation(userId, activeChallenge.id);
      if (!participation) {
        return res.status(400).json({ error: "Not participating in active challenge" });
      }

      // Calculate points based on activity type
      const pointsMap: { [key: string]: number } = {
        gym_visit: 25,
        healthy_meal: 15,
        clinic_checkin: 30,
        store_purchase: 10
      };

      const points = pointsMap[activityType] || 0;

      // Create activity record
      await storage.createChallengeActivity({
        participationId: participation.id,
        activityType,
        points,
        description
      });

      // Update participation score
      const updatedParticipation = await storage.updateChallengeScore(participation.id, activityType, points);

      res.json({ 
        success: true, 
        points, 
        participation: updatedParticipation 
      });
    } catch (error) {
      console.error("Error recording challenge activity:", error);
      res.status(500).json({ error: "Failed to record challenge activity" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
