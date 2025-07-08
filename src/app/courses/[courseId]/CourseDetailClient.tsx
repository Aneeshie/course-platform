"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, FileText, Lock, PlayCircle } from "lucide-react";
import PurchaseButton from "@/components/PurchaseButton";

export default function CourseDetailPage({
  courseId,
}: {
  courseId: Id<"courses">;
}) {
  const { user, isLoaded: isUserLoaded } = useUser();

  const userData = useQuery(api.users.getUserByClerkId, {
    clerkId: user?.id ?? "",
  });

  const courseData = useQuery(api.courses.getCourseById, {
    courseId,
  });

  const userAccess = useQuery(
    api.users.getIfUserAccess,
    userData
      ? {
          userId: userData._id,
          courseId,
        }
      : "skip",
  ) ?? { hasAccess: false };

  if (!isUserLoaded || courseData === undefined) {
    return <CourseDetailSkeleton />;
  }

  if (courseData === null) return notFound();

  return (
    <div className="container mx-auto py-8 px-4 text-white">
      <Card className="max-w-4xl mx-auto bg-[#1a1a2e] border border-purple-800 shadow-md">
        <CardHeader className="p-0">
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={courseData.imageUrl}
              alt={courseData.title}
              fill
              className="rounded-t-md object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-3xl mb-4 text-white">
            {courseData.title}
          </CardTitle>

          {userAccess.hasAccess ? (
            <>
              <p className="text-purple-200 mb-6">{courseData.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Button className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white">
                  <PlayCircle className="size-5" />
                  <span>Start the Course</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center space-x-2 border-purple-500 text-purple-500 hover:bg-purple-700/20 hover:text-white"
                >
                  <Download className="size-5" />
                  <span>Download Materials</span>
                </Button>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-white">
                Course Modules
              </h3>
              <ul className="space-y-2 text-purple-200">
                <li className="flex items-center space-x-3">
                  <FileText className="size-5 text-purple-400" />
                  <span>Introduction to the course</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FileText className="size-5 text-purple-400" />
                  <span>Hooks and custom hooks</span>
                </li>
              </ul>
            </>
          ) : (
            <div className="text-center">
              <div className="flex flex-col items-center space-y-2">
                <Lock className="size-16 text-purple-500" />
                <p className="text-lg text-purple-200">
                  This course is not available to you
                </p>
                <p className="text-purple-400 mb-4">
                  Enroll in this course to access all the content!
                </p>
                <p className="text-2xl font-bold mb-4 text-white">
                  ${courseData.price.toFixed(2)}
                </p>
                <PurchaseButton courseId={courseId} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function CourseDetailSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto bg-[#1a1a2e] border border-purple-800">
        <CardHeader className="p-0">
          <Skeleton className="w-full h-64 md:h-96 rounded-t-md" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
