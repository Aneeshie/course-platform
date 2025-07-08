// app/(course)/[courseId]/page.tsx
import { Id } from "../../../../convex/_generated/dataModel";
import CourseDetailPage from "./CourseDetailClient";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: Id<"courses"> }>;
}) {
  const { courseId } = await params;
  return <CourseDetailPage courseId={courseId} />;
}
