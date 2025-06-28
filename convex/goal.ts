import {v} from "convex/values";
import {mutation} from "./_generated/server";

export const createGoal=mutation({
    args: {
      title: v.string(),
      description: v.string(),
      targetDate: v.string(), // ISO format// Timestamp when the goal was completed
      userId:v.id("users"),
    },
    handler : async (ctx,args)=>{
        return await ctx.db.insert("goal",{
                title: args.title,
                description: args.description,
                targetDate: args.targetDate, // ISO format
                userId:args.userId,
                isCompleted: false,
                createdAt: Date.now(),
        });
    },
});