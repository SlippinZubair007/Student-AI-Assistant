import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    profilePicture: v.optional(v.string()),
    createdAt: v.optional(v.number()),
    clerkId: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

  plans: defineTable({
    userId: v.string(),
    planName: v.string(),
    studyPlan: v.array(
      v.object({
        day: v.string(),
        subjects: v.array(v.string()),
        totalDuration: v.number(),
      })
    ),
    createdAt: v.optional(v.number()),
    isActive: v.boolean(),
  }),

  goal: defineTable({
  userId: v.string(),
  title: v.string(), // ISO format
  description: v.string(), // 🆕 Title shown on hover
  targetDate: v.string(), // ISO format
  isCompleted: v.boolean(),
  CompletedAt: v.optional(v.number()), // Timestamp when the goal was completed
  createdAt: v.optional(v.number()),
}).index("by_user_id", ["userId"]),

});
