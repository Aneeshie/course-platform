import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const page = ({
  params,
  searchParams,
}: {
  params: { courseId: string };
  searchParams: { session_id: string };
}) => {
  const { courseId } = params;
  const { session_id } = searchParams;

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CheckCircle2 className="size-16 text-purple-500 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-purple-800">
            Purchase Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6 ">
          <p className="text-xl text-gray-700">
            Thank you enrolling to my non-existent course!
          </p>

          <div className="bg-gray-200 py-4 rounded">
            <p className="text-sm text-gray-500">
              transaction Id: {session_id}
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Link href={`/courses/${courseId}`}>
              <Button className="w-full sm:w-auto flex items-center justify-center">
                Go To Course
              </Button>
            </Link>
            <Link href={"/courses"}>
              <Button variant={"outline"} className="w-full sm:w-auto">
                Browse for more courses!
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
