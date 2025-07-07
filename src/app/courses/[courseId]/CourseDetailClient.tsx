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
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <Image
            src={courseData.imageUrl}
            alt={courseData.title}
            width={1200}
            height={600}
            className="rounded-md object-cover w-full"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-3xl mb-4">{courseData.title}</CardTitle>
          {userAccess.hasAccess ? (
            <>
              <p className="text-gray-600 mb-6">{courseData.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-8">
                <Button className="flex items-center justify-center space-x-2">
                  <PlayCircle className="size-5" />
                  <span>Start the Course</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center space-x-2"
                >
                  <Download className="size-5" />
                  <span>Download Materials</span>
                </Button>
              </div>
              <h3 className="text-xl font-semibold mb-4">Course Modules</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-3">
                  <FileText className="size-5 text-gray-400" />
                  <span>Introduction to the course</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FileText className="size-5 text-gray-400" />
                  <span>Hooks and custom hooks</span>
                </li>
              </ul>
            </>
          ) : (
            <div className="text-center">
              <div className="flex flex-col items-center space-y-2">
                <Lock className="size-16 text-gray-500" />
                <p className="text-lg text-gray-600">
                  This Course Is Not Available To You
                </p>
                <p className="text-gray-500 mb-4">
                  Enroll in this course to access all the content!
                </p>
                <p className="text-2xl font-bold mb-4">
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
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <Skeleton className="w-full h-[600px] rounded-md" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-0.75 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-0.66 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
