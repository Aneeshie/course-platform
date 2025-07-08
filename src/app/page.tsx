import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import PurchaseButton from "@/components/PurchaseButton";

export default async function Home() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const courses = await convex.query(api.courses.getCourses);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-[#1a1a2e] to-[#22004e] text-white">
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-white">
            Forge Your Path in Modern Development
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Master fullstack skills through engaging, project-based learning.
            Unlock your potential with Edvora.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {courses.slice(0, 3).map((course) => (
            <Card
              key={course._id}
              className="flex flex-col bg-[#1a1a2e] border border-purple-800 shadow-md hover:shadow-purple-500/30 transition-shadow"
            >
              <Link href={`/courses/${course._id}`} className="cursor-pointer">
                <CardHeader className="p-0">
                  <Image
                    src={course.imageUrl}
                    alt={course.title}
                    width={640}
                    height={360}
                    className="rounded-t-md object-cover w-full h-[200px]"
                  />
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <CardTitle className="text-xl mb-2 text-white hover:underline">
                    {course.title}
                  </CardTitle>
                </CardContent>
              </Link>

              <CardFooter className="flex justify-between items-center p-4 border-t border-purple-800">
                <Badge
                  variant="outline"
                  className="text-lg px-3 py-1 border-purple-500 text-purple-200"
                >
                  ${course.price.toFixed(2)}
                </Badge>

                <SignedIn>
                  <PurchaseButton courseId={course._id} />
                </SignedIn>

                <SignedOut>
                  <SignInButton mode="modal">
                    <Button
                      variant="outline"
                      className="border-purple-500 text-purple-300 hover:bg-purple-700/20 hover:text-white bg-gray-600"
                    >
                      Enroll Now
                    </Button>
                  </SignInButton>
                </SignedOut>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/pro">
            <Button
              size="lg"
              className="group bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300"
            >
              Explore Pro Plans
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </main>

      <footer className="text-center py-6 text-purple-300">
        © 2025 Edvora. All rights reserved.
      </footer>
    </div>
  );
}
