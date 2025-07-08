"use client";

import { useUser } from "@clerk/nextjs";
import { useAction, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { PRO_PLANS } from "../constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const ProPage = () => {
  const [loadingPlan, setLoadingPlan] = useState("");
  const { user, isLoaded: isUserLoaded } = useUser();

  const userData = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user?.id } : "skip",
  );

  const userSubscription = useQuery(
    api.subscription.getUserSubscription,
    userData ? { userId: userData?._id } : "skip",
  );

  const isYearlySubscriptionActive =
    userSubscription?.status === "active" &&
    userSubscription.planType === "year";

  const createProPlanCheckoutSession = useAction(
    api.stripe.createProPlanCheckoutSession,
  );

  const handlePlanSelection = async (planId: "month" | "year") => {
    if (!user) {
      toast.error("Please log in to select a plan.");
      return;
    }

    setLoadingPlan(planId);
    try {
      const result = await createProPlanCheckoutSession({ planId });
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      }
    } catch (error: any) {
      if (error.message.includes("Rate limit exceeded")) {
        toast.error("Too many attempts. Try again later.");
      } else {
        toast.error("Error starting purchase. Try again.");
      }
      console.error(error);
    } finally {
      setLoadingPlan("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl text-white">
      <h1 className="text-4xl font-bold text-center mb-4">
        Choose Your Pro Journey
      </h1>
      <p className="text-xl text-center mb-12 text-purple-200">
        Unlock premium features and accelerate your learning
      </p>

      {isUserLoaded && userSubscription?.status === "active" && (
        <div className="bg-purple-900/40 border-l-4 border-purple-500 p-4 mb-8 rounded-md">
          <p className="text-purple-200">
            You have an active{" "}
            <span className="font-semibold text-white">
              {userSubscription.planType}
            </span>{" "}
            subscription.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        {PRO_PLANS.map((plan) => (
          <Card
            key={plan.id}
            className={`flex flex-col transition-all duration-300 bg-[#1a1a2e] border ${
              plan.highlighted
                ? "border-purple-500 shadow-lg hover:shadow-purple-700/30"
                : "border-purple-800 hover:border-purple-600 hover:shadow-md"
            }`}
          >
            <CardHeader className="flex-grow">
              <CardTitle
                className={`text-2xl ${
                  plan.highlighted ? "text-purple-400" : "text-purple-300"
                }`}
              >
                {plan.title}
              </CardTitle>

              <CardDescription className="mt-2">
                <span className="text-3xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-purple-400 ml-1">{plan.period}</span>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center">
                    <Check
                      className={`h-5 w-5 ${
                        plan.highlighted ? "text-purple-400" : "text-green-400"
                      } mr-2`}
                    />
                    <span className="text-purple-200">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="mt-auto">
              <Button
                className={`w-full py-6 text-lg ${
                  plan.highlighted
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-transparent border border-purple-500 text-purple-300 hover:bg-purple-700/10"
                }`}
                onClick={() => handlePlanSelection(plan.id as "month" | "year")}
                disabled={
                  userSubscription?.status === "active" &&
                  (userSubscription.planType === plan.id ||
                    isYearlySubscriptionActive)
                }
              >
                {loadingPlan === plan.id ? (
                  <>
                    <Loader2Icon className="mr-2 size-4 animate-spin" />
                    Processing...
                  </>
                ) : isUserLoaded &&
                  userSubscription?.status === "active" &&
                  userSubscription.planType === plan.id ? (
                  "Current Plan"
                ) : isUserLoaded &&
                  plan.id === "month" &&
                  isYearlySubscriptionActive ? (
                  "Yearly Plan Active"
                ) : (
                  plan.ctaText
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProPage;
