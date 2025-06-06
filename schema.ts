import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  profileImage: true,
});

// Appointment model
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  serviceType: text("service_type").notNull(), // clinic, gym, telehealth, etc.
  serviceName: text("service_name").notNull(),
  providerName: text("provider_name").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  duration: integer("duration").notNull(), // in minutes
  status: text("status").notNull(), // confirmed, pending, cancelled, completed
  appointmentType: text("appointment_type").notNull(), // in-person, video, phone
  meetingLink: text("meeting_link"), // for telehealth video calls
  notes: text("notes"), // appointment notes
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAppointmentSchema = createInsertSchema(appointments).pick({
  userId: true,
  serviceType: true,
  serviceName: true,
  providerName: true,
  date: true,
  time: true,
  duration: true,
  status: true,
  appointmentType: true,
  meetingLink: true,
  notes: true,
});

// Fitness Classes model
export const fitnessClasses = pgTable("fitness_classes", {
  id: serial("id").primaryKey(),
  className: text("class_name").notNull(),
  instructor: text("instructor").notNull(),
  description: text("description").notNull(),
  day: text("day").notNull(),
  time: text("time").notNull(),
  duration: integer("duration").notNull(), // in minutes
  capacity: integer("capacity").notNull(),
  currentRegistered: integer("current_registered").notNull().default(0),
  imageUrl: text("image_url"),
});

export const insertFitnessClassSchema = createInsertSchema(fitnessClasses).pick({
  className: true,
  instructor: true,
  description: true,
  day: true,
  time: true,
  duration: true,
  capacity: true,
  currentRegistered: true,
  imageUrl: true,
});

// Class Registrations
export const classRegistrations = pgTable("class_registrations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  classId: integer("class_id").notNull(),
  registeredAt: timestamp("registered_at").defaultNow(),
});

export const insertClassRegistrationSchema = createInsertSchema(classRegistrations).pick({
  userId: true,
  classId: true,
});

// Menu Items model
export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // in cents
  imageUrl: text("image_url"),
  tags: text("tags").array(), // vegan, gluten-free, etc.
  nutritionalInfo: json("nutritional_info"), // JSON object with nutritional info
  category: text("category").notNull(), // main, appetizer, dessert, etc.
});

export const insertMenuItemSchema = createInsertSchema(menuItems).pick({
  name: true,
  description: true,
  price: true,
  imageUrl: true,
  tags: true,
  nutritionalInfo: true,
  category: true,
});

// Store Products model
export const storeProducts = pgTable("store_products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // in cents
  imageUrl: text("image_url"),
  category: text("category").notNull(), // produce, supplements, prepared meals, etc.
  inStock: boolean("in_stock").notNull().default(true),
  tags: text("tags").array(), // organic, local, etc.
});

export const insertStoreProductSchema = createInsertSchema(storeProducts).pick({
  name: true,
  description: true,
  price: true,
  imageUrl: true,
  category: true,
  inStock: true,
  tags: true,
});

// Cart Items
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  addedAt: timestamp("added_at").defaultNow(),
});

export const insertCartItemSchema = createInsertSchema(cartItems).pick({
  userId: true,
  productId: true,
  quantity: true,
});

// Enhanced Health Metrics
export const healthMetrics = pgTable("health_metrics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  metricType: text("metric_type").notNull(), // vitals, fitness, nutrition, sleep, mental_health
  metricName: text("metric_name").notNull(), // heart_rate, blood_pressure, weight, steps, calories, sleep_hours, mood
  value: integer("value").notNull(),
  unit: text("unit").notNull(), // bpm, mmHg, lbs, kg, steps, calories, hours, score
  date: timestamp("date").defaultNow(),
  notes: text("notes"), // optional notes from user or provider
});

export const insertHealthMetricSchema = createInsertSchema(healthMetrics).pick({
  userId: true,
  metricType: true,
  metricName: true,
  value: true,
  unit: true,
  notes: true,
});

// Daily Health Logs
export const dailyHealthLogs = pgTable("daily_health_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  date: text("date").notNull(), // YYYY-MM-DD format
  steps: integer("steps").default(0),
  caloriesBurned: integer("calories_burned").default(0),
  waterIntake: integer("water_intake").default(0), // in ounces
  sleepHours: integer("sleep_hours").default(0),
  moodScore: integer("mood_score").default(5), // 1-10 scale
  energyLevel: integer("energy_level").default(5), // 1-10 scale
  stressLevel: integer("stress_level").default(5), // 1-10 scale
  workoutMinutes: integer("workout_minutes").default(0),
  meditationMinutes: integer("meditation_minutes").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertDailyHealthLogSchema = createInsertSchema(dailyHealthLogs).pick({
  userId: true,
  date: true,
  steps: true,
  caloriesBurned: true,
  waterIntake: true,
  sleepHours: true,
  moodScore: true,
  energyLevel: true,
  stressLevel: true,
  workoutMinutes: true,
  meditationMinutes: true,
});

// Progress Data 
export const progressData = pgTable("progress_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  week: integer("week").notNull(),
  gymVisits: integer("gym_visits").notNull().default(0),
  healthyMeals: integer("healthy_meals").notNull().default(0),
  healthPoints: integer("health_points").notNull().default(0),
  date: timestamp("date").defaultNow(),
});

export const insertProgressDataSchema = createInsertSchema(progressData).pick({
  userId: true,
  week: true,
  gymVisits: true,
  healthyMeals: true,
  healthPoints: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;

export type FitnessClass = typeof fitnessClasses.$inferSelect;
export type InsertFitnessClass = z.infer<typeof insertFitnessClassSchema>;

export type ClassRegistration = typeof classRegistrations.$inferSelect;
export type InsertClassRegistration = z.infer<typeof insertClassRegistrationSchema>;

export type MenuItem = typeof menuItems.$inferSelect;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;

export type StoreProduct = typeof storeProducts.$inferSelect;
export type InsertStoreProduct = z.infer<typeof insertStoreProductSchema>;

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;

export type HealthMetric = typeof healthMetrics.$inferSelect;
export type InsertHealthMetric = z.infer<typeof insertHealthMetricSchema>;

export type DailyHealthLog = typeof dailyHealthLogs.$inferSelect;
export type InsertDailyHealthLog = z.infer<typeof insertDailyHealthLogSchema>;

export type ProgressData = typeof progressData.$inferSelect;
export type InsertProgressData = z.infer<typeof insertProgressDataSchema>;

// Telehealth Consultations model
export const telehealthConsultations = pgTable("telehealth_consultations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  doctorId: integer("doctor_id").notNull(),
  consultationType: text("consultation_type").notNull(), // video, phone, chat
  specialty: text("specialty").notNull(), // general, cardiology, mental health, etc.
  scheduledDate: text("scheduled_date").notNull(),
  scheduledTime: text("scheduled_time").notNull(),
  duration: integer("duration").notNull(), // in minutes
  status: text("status").notNull(), // scheduled, in-progress, completed, cancelled
  meetingRoomId: text("meeting_room_id"), // for video calls
  prescriptions: json("prescriptions"), // prescribed medications
  diagnosis: text("diagnosis"), // doctor's diagnosis
  notes: text("notes"), // consultation notes
  followUpRequired: boolean("follow_up_required").default(false),
  recordingUrl: text("recording_url"), // if consultation is recorded
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTelehealthConsultationSchema = createInsertSchema(telehealthConsultations).pick({
  userId: true,
  doctorId: true,
  consultationType: true,
  specialty: true,
  scheduledDate: true,
  scheduledTime: true,
  duration: true,
  status: true,
  meetingRoomId: true,
  prescriptions: true,
  diagnosis: true,
  notes: true,
  followUpRequired: true,
  recordingUrl: true,
});

// Telehealth Doctors model
export const telehealthDoctors = pgTable("telehealth_doctors", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  specialty: text("specialty").notNull(),
  licenseNumber: text("license_number").notNull(),
  bio: text("bio"),
  experience: integer("experience"), // years of experience
  education: text("education"),
  languages: json("languages"), // languages spoken
  availableHours: json("available_hours"), // schedule availability
  consultationFee: integer("consultation_fee"), // fee in cents
  rating: integer("rating").default(5), // 1-5 star rating
  profileImage: text("profile_image"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTelehealthDoctorSchema = createInsertSchema(telehealthDoctors).pick({
  fullName: true,
  specialty: true,
  licenseNumber: true,
  bio: true,
  experience: true,
  education: true,
  languages: true,
  availableHours: true,
  consultationFee: true,
  rating: true,
  profileImage: true,
  isActive: true,
});

export type TelehealthConsultation = typeof telehealthConsultations.$inferSelect;
export type InsertTelehealthConsultation = z.infer<typeof insertTelehealthConsultationSchema>;

export type TelehealthDoctor = typeof telehealthDoctors.$inferSelect;
export type InsertTelehealthDoctor = z.infer<typeof insertTelehealthDoctorSchema>;

// Loyalty Program Schema
export const loyaltyProgram = pgTable("loyalty_program", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  totalPoints: integer("total_points").default(0).notNull(),
  currentTierLevel: integer("current_tier_level").default(1).notNull(),
  lifetimeSpent: integer("lifetime_spent").default(0).notNull(), // in cents
  joinedAt: timestamp("joined_at").defaultNow(),
  lastActivity: timestamp("last_activity").defaultNow(),
});

export const insertLoyaltyProgramSchema = createInsertSchema(loyaltyProgram).pick({
  userId: true,
  totalPoints: true,
  currentTierLevel: true,
  lifetimeSpent: true,
});

export const loyaltyTransactions = pgTable("loyalty_transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  pointsEarned: integer("points_earned").default(0).notNull(),
  pointsRedeemed: integer("points_redeemed").default(0).notNull(),
  transactionType: text("transaction_type").notNull(), // clinic, gym, restaurant, store, referral, bonus
  serviceDetails: text("service_details").notNull(),
  relatedOrderId: integer("related_order_id"), // for linking to appointments, purchases, etc
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLoyaltyTransactionSchema = createInsertSchema(loyaltyTransactions).pick({
  userId: true,
  pointsEarned: true,
  pointsRedeemed: true,
  transactionType: true,
  serviceDetails: true,
  relatedOrderId: true,
});

export const loyaltyRewards = pgTable("loyalty_rewards", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  pointsCost: integer("points_cost").notNull(),
  category: text("category").notNull(), // clinic_discount, gym_free_class, restaurant_discount, store_discount, exclusive_access
  discountPercent: integer("discount_percent"),
  discountAmount: integer("discount_amount"), // in cents
  tierRequirement: integer("tier_requirement").default(1).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  expiryDays: integer("expiry_days").default(30).notNull(),
  usageLimit: integer("usage_limit").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLoyaltyRewardSchema = createInsertSchema(loyaltyRewards).pick({
  name: true,
  description: true,
  pointsCost: true,
  category: true,
  discountPercent: true,
  discountAmount: true,
  tierRequirement: true,
  isActive: true,
  expiryDays: true,
  usageLimit: true,
});

export const userRewards = pgTable("user_rewards", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  rewardId: integer("reward_id").notNull().references(() => loyaltyRewards.id),
  redeemedAt: timestamp("redeemed_at").defaultNow(),
  usedAt: timestamp("used_at"),
  expiresAt: timestamp("expires_at").notNull(),
  isUsed: boolean("is_used").default(false).notNull(),
  usageCount: integer("usage_count").default(0).notNull(),
});

export const insertUserRewardSchema = createInsertSchema(userRewards).pick({
  userId: true,
  rewardId: true,
  expiresAt: true,
});

export type LoyaltyProgram = typeof loyaltyProgram.$inferSelect;
export type InsertLoyaltyProgram = z.infer<typeof insertLoyaltyProgramSchema>;

export type LoyaltyTransaction = typeof loyaltyTransactions.$inferSelect;
export type InsertLoyaltyTransaction = z.infer<typeof insertLoyaltyTransactionSchema>;

export type LoyaltyReward = typeof loyaltyRewards.$inferSelect;
export type InsertLoyaltyReward = z.infer<typeof insertLoyaltyRewardSchema>;

export type UserReward = typeof userRewards.$inferSelect;
export type InsertUserReward = z.infer<typeof insertUserRewardSchema>;

// Seasonal Wellness Challenges
export const wellnessChallenges = pgTable("wellness_challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  season: text("season").notNull(), // spring, summer, fall, winter
  year: integer("year").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  pointsReward: integer("points_reward").default(100).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertWellnessChallengeSchema = createInsertSchema(wellnessChallenges).pick({
  title: true,
  description: true,
  season: true,
  year: true,
  startDate: true,
  endDate: true,
  isActive: true,
  pointsReward: true,
});

// Challenge Participation
export const challengeParticipation = pgTable("challenge_participation", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  challengeId: integer("challenge_id").notNull(),
  joinedAt: timestamp("joined_at").defaultNow(),
  totalScore: integer("total_score").default(0).notNull(),
  gymVisits: integer("gym_visits").default(0).notNull(),
  healthyMeals: integer("healthy_meals").default(0).notNull(),
  clinicCheckins: integer("clinic_checkins").default(0).notNull(),
  storeHealthPurchases: integer("store_health_purchases").default(0).notNull(),
  isCompleted: boolean("is_completed").default(false).notNull(),
});

export const insertChallengeParticipationSchema = createInsertSchema(challengeParticipation).pick({
  userId: true,
  challengeId: true,
  totalScore: true,
  gymVisits: true,
  healthyMeals: true,
  clinicCheckins: true,
  storeHealthPurchases: true,
  isCompleted: true,
});

// Challenge Activities
export const challengeActivities = pgTable("challenge_activities", {
  id: serial("id").primaryKey(),
  participationId: integer("participation_id").notNull(),
  activityType: text("activity_type").notNull(), // gym_visit, healthy_meal, clinic_checkin, store_purchase
  points: integer("points").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertChallengeActivitySchema = createInsertSchema(challengeActivities).pick({
  participationId: true,
  activityType: true,
  points: true,
  description: true,
});

export type WellnessChallenge = typeof wellnessChallenges.$inferSelect;
export type InsertWellnessChallenge = z.infer<typeof insertWellnessChallengeSchema>;

export type ChallengeParticipation = typeof challengeParticipation.$inferSelect;
export type InsertChallengeParticipation = z.infer<typeof insertChallengeParticipationSchema>;

export type ChallengeActivity = typeof challengeActivities.$inferSelect;
export type InsertChallengeActivity = z.infer<typeof insertChallengeActivitySchema>;
