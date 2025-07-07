// app/(course)/[courseId]/page.tsx
import { Id } from "../../../../convex/_generated/dataModel";
import CourseDetailPage from "./CourseDetailClient"; // rename your component

export default function CoursePage({
  params,
}: {
  params: { courseId: Id<"courses"> };
}) {
  return <CourseDetailPage courseId={params.courseId} />;
}
