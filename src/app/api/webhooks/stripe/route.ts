import stripe from "@/lib/stripe";
import { ConvexHttpClient } from "convex/browser";
import Stripe from "stripe";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.log(`Webhook signature verficiation failed: `, err.message);
    return new Response("Webhook signature verficiation failed, ", {
      status: 400,
    });
  }
  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
        break;
    }
  } catch (error) {
    console.log("Error: ", error);
    return new Response("Error processing webhook", { status: 400 });
  }

  return new Response(null, {status: 200})
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  const courseId = session.metadata?.courseId;
  const stripeCustomerId = session.customer as string;

  if (!stripeCustomerId || !courseId) {
    throw new Error("Missing courseId or StripeCustomerId");
  }

  const user = await convex.query(api.users.getUserByStripCustomerId, {
    stripeCustomerId: stripeCustomerId,
  });

  if (!user) {
    throw new Error("User not found");
  }

  await convex.mutation(api.purchases.createPurchase, {
    userId: user._id,
    courseId: courseId as Id<"courses">,
    amount: session.amount_total as number,
    stripePurchaseId: session.id
  });
  //TODO: SUCCESS EMAIL
}
