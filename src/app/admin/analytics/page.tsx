import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AnalyticsPage } from "@/components/admin/AnalyticsPage";

export default async function Analytics() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return <AnalyticsPage />;
}