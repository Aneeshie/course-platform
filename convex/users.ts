import { v } from "convex/values"
import {mutation, query} from "./_generated/server"
import {ConvexError} from "convex/values"

export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    clerkId: v.string(),
    stripeCustomerId: v.string(),
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

export const getUserByClerkId = query({
  args: {clerkId: v.string()},
  handler: async (ctx,args) => {
    return await ctx.db.query("users").withIndex("by_clerkId",(q)=>q.eq("clerkId",args.clerkId)).unique();
  }
})


export const getUserByStripCustomerId = query({
  args: {stripeCustomerId: v.string()},
  handler: async (ctx,args) => {
    return await ctx.db.query("users").withIndex("by_stripe_customerId",(q) => q.eq("stripeCustomerId",args.stripeCustomerId)).unique();
  }
})

export const getIfUserAccess = query({
  args: {userId: v.id("users"), courseId: v.id("courses")},
  handler: async (ctx,args) => {
    const identity = await ctx.auth.getUserIdentity();

    if(!identity) throw new ConvexError("unauthorized")

    const user = await ctx.db.get(args.userId);
    if(!user) throw new ConvexError("User not found");
      
    //check for subs
    if(user.currentSubscriptionId){
      const subscription = await ctx.db.get(user.currentSubscriptionId);
      if(subscription && subscription.status === "active"){
        return {hasAccess: true, accessType: "subscription"};
      }
    }

    //check for individual course access
    
    const purchase = await ctx.db.query("purchases").withIndex("by_userId_and_courseId", (q)=>q.eq("userId",args.userId).eq("courseId",args.courseId)).unique();

    if(purchase){
      return {hasAccess: true, accessType: "course"}
    }
    
    return {hasAccess: false};
  }
})
