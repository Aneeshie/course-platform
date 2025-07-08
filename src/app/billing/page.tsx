"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  CheckCircle,
  CreditCard,
  Loader,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

const BillingPage = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const userData = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user.id } : "skip",
  );

  const subscription = useQuery(
    api.subscription.getUserSubscription,
    userData ? { userId: userData?._id } : "skip",
  );

  const handleManageBilling = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-billing-portal", {
        method: "POST",
      });
      const { url } = await response.json();
      if (url) window.location.href = url;
      else throw new Error("Failed to create billing portal");
    } catch (error: any) {
      toast.error(
        error.message || "Something went wrong, please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!userData || subscription === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="size-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl text-white h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Billing Management
      </h1>

      <Card className="w-full shadow-lg border border-purple-800 bg-[#1a1a2e]">
        {subscription ? (
          <>
            <CardHeader className="pb-0">
              <CardTitle className="text-2xl flex items-center gap-2 text-green-400">
                <CheckCircle className="size-6" />
                Active Subscription
              </CardTitle>
              <CardDescription className="text-purple-300">
                Manage your subscription details below
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-5">
              <div className="grid grid-cols-2 gap-4 bg-purple-900/20 p-4 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-purple-300">Plan</p>
                  <p className="text-lg font-semibold capitalize">
                    {subscription.planType}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-purple-300">Status</p>
                  <p className="text-lg font-semibold capitalize">
                    {subscription.status}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-sm font-medium text-purple-300">
                    Next Billing Date
                  </p>
                  <p className="text-lg font-semibold">
                    {formatDate(subscription.currentPeriodEnd)}
                  </p>
                </div>
              </div>

              {subscription.cancelAtPeriodEnd && (
                <div className="flex items-center bg-yellow-900/30 p-4 rounded-lg text-yellow-300">
                  <AlertTriangle className="size-5 mr-3" />
                  <p className="text-sm">
                    Your subscription will be cancelled at the end of the
                    current billing period.
                  </p>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-end mt-6 bg-purple-900/10">
              <Button
                onClick={handleManageBilling}
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader className="mr-2 size-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Manage Billing"
                )}
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <div className="h-1 w-full bg-gradient-to-r from-purple-700 via-purple-500 to-purple-400" />
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 text-white">
                <CreditCard className="h-6 w-6 text-purple-300" />
                No Active Subscription
              </CardTitle>
              <CardDescription className="text-purple-400">
                Upgrade to Pro to unlock premium features
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center py-12">
              <p className="text-lg mb-6 text-purple-200">
                Get access to exclusive content and features with our Pro plan.
              </p>
              <Link href="/pro">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg">
                  <Zap className="mr-2 h-5 w-5" />
                  Explore Pro Plans
                </Button>
              </Link>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default BillingPage;
