"use client";

import { useUser } from "@clerk/nextjs";
import { Id } from "../../convex/_generated/dataModel";
import { useAction, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PurchaseButton = ({ courseId }: { courseId: Id<"courses"> }) => {
  const { user } = useUser();
  const userData = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user.id } : "skip",
  );

  const [isLoading, setIsLoading] = useState(false);
  const createCheckoutSession = useAction(api.stripe.makeCheckoutSession);

  const userAccess = useQuery(
    api.users.getIfUserAccess,
    userData
      ? {
          userId: userData?._id,
          courseId,
        }
      : "skip",
  ) || { hasAccess: false };

  const handlePurchase = async () => {
    if (!user) {
      toast.error("Please login first.");
      return;
    }

    setIsLoading(true);

    try {
      const { checkoutUrl } = await createCheckoutSession({ courseId });

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error: any) {
      if (error.message.includes("Rate Limit Exceeded")) {
        toast.error("You have tried too many times. Please try again later.");
      } else {
        toast.error(
          error.message || "Something went wrong. Please try again later.",
        );
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ⏳ Loading state always takes priority
  if (isLoading) {
    return (
      <Button disabled>
        <LoaderIcon className="mr-2 size-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  if (!userAccess.hasAccess) {
    return (
      <Button
        variant="outline"
        onClick={handlePurchase}
        className="border-purple-500 text-purple-300 hover:bg-purple-700/20 hover:text-white bg-gray-600"
      >
        Enroll Now
      </Button>
    );
  }

  if (userAccess.hasAccess) {
    return (
      <Button
        variant="outline"
        disabled
        className="border-green-500 text-green-400 cursor-default bg-gray-700"
      >
        Enrolled
      </Button>
    );
  }

  return null;
};

export default PurchaseButton;
