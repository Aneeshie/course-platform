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
    // TODO
    if (!user) alert("please login");
    setIsLoading(true);
    try {
      const { checkoutUrl } = await createCheckoutSession({ courseId });
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("Failed to create checkoutSession");
      }
    } catch (error: any) {
      if (error.message.includes("Rate Limit Exceeded")) {
        toast.error("You have tried too many times, please try again later");
      } else {
        toast.error(
          error.message || "something went wrong please try again later",
        );
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userAccess.hasAccess) {
    return (
      <Button variant={"outline"} onClick={handlePurchase} disabled={isLoading}>
        Enroll Now
      </Button>
    );
  }

  if (userAccess.hasAccess) {
    return <Button variant={"outline"}>Enrolled</Button>;
  }

  if (isLoading) {
    return (
      <Button>
        <LoaderIcon className="mr-2 size-4 animate-spin" />
        Loading......
      </Button>
    );
  }
};

export default PurchaseButton;
