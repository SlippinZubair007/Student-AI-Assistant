import { defineSchema , defineTable} from "convex/server";
import { v } from "convex/values";  

export default defineSchema({
     users: defineTable({
        name:v.string(),
        email:v.string(),
        profilePicture:v.optional(v.string()),
        createdAt:v.optional(v.number()),
        clerkId:v.string(),
     }).index("by_clerk_id",["clerkId"]),

     plans: defineTable({
        userId:v.string(),
        planName:v.string(),
        studyPlan:v.array(
        v.object({
            day:v.string(),
            subjects:v.array(v.string()),
            totalDuration:v.number(),
        })
       ),
        createdAt:v.optional(v.number()),
        isActive:v.boolean(),
     })
     .index("by_user_id",["userId"])
     .index("by_active",["isActive"]),
})