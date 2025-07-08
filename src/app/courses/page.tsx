import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import PurchaseButton from "@/components/PurchaseButton";

const page = async () => {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const courses = await convex.query(api.courses.getCourses);

  return (
    <div className="container mx-auto py-8 px-4 text-white">
      <h1 className="text-3xl font-bold mb-8 text-white">All Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card
            key={course._id}
            className="flex flex-col bg-[#1a1a2e] border border-purple-800 shadow-md hover:shadow-purple-500/20 transition-shadow"
          >
            <Link href={`/courses/${course._id}`} className="cursor-pointer">
              <CardHeader className="p-0">
                <div className="relative w-full h-48">
                  <Image
                    src={course.imageUrl}
                    alt={course.title}
                    fill
                    className="rounded-t-md object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </CardHeader>

              <CardContent className="flex-grow">
                <CardTitle className="text-xl mb-2 text-white hover:underline">
                  {course.title}
                </CardTitle>
              </CardContent>
            </Link>

            <CardFooter className="flex justify-between items-center">
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
                    className="border-purple-500 text-purple-200 hover:bg-purple-700/20 hover:text-white"
                  >
                    Enroll Now
                  </Button>
                </SignInButton>
              </SignedOut>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default page;
