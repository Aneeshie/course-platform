import { v } from "convex/values"
import {mutation, query} from "./_generated/server"


export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    clerkId: v.string()
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db.query("users").withIndex("by_clerkId", q => q.eq("clerkId", args.clerkId)).unique();

    if(existingUser){
      console.log("user already exists")
      return existingUser._id;
    }

    const userId = await ctx.db.insert("users",{
      ...args
    })

    return userId
  }
})