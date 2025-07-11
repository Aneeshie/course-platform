import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    stripeCustomerId: v.string(),
    currentSubscriptionId: v.optional(v.id("subscriptions")),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_stripe_customerId", ["stripeCustomerId"])
    .index("by_currentSubscriptionId", ["currentSubscriptionId"]),

  courses: defineTable({
    title: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    price: v.number(),
  }),

  purchases: defineTable({
    userId: v.id("users"),
    courseId: v.id("courses"),
    amount: v.number(),
    purchaseDate: v.number(), // unix time
    stripePurchaseId: v.string(),
  }).index("by_userId_and_courseId", ["userId", "courseId"]),

  subscriptions: defineTable({
    userId: v.id("users"),
    planType: v.union(v.literal("month"), v.literal("year")),
    currentPeriodStart: v.number(),
    currentPeriodEnd: v.number(),
    stripeSubscriptionId: v.string(),
    status: v.string(),
    cancelAtPeriodEnd: v.boolean(),
  }).index("by_stripe_subscriptionId", ["stripeSubscriptionId"]),
});
