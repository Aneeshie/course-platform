
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const Page = async () => {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const courses = await convex.query(api.courses.getCourses);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            Forge your path in Modern Development
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            lorem ipsum
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {courses.slice(0, 3).map((course) => (
            <Card key={course._id} className="flex flex-col">
              <Link href={`/courses/${course._id}`} className="cursor-pointer">
                <CardHeader>
                  <Image
                    src={course.imageUrl}
                    alt={course.title}
                    width={640}
                    height={360}
                    className="rounded-md object-cover"
                  />
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardTitle className="text-xl mb-2 hover:underline">
                    {course.title}
                  </CardTitle>
                </CardContent>
              </Link>

            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Page;

