import { Suspense } from "react";
import SuccessPage from "./SuccessClient";

export default async function SuccessPageServer({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const { year } = await searchParams;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPage year={year} />
    </Suspense>
  );
}
