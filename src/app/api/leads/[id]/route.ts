import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { statusUpdateSchema } from "@/lib/validation";
import { getDb } from "@/db";
import { leads } from "@/db/schema";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = statusUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { status } = parsed.data;

    const [updated] = await getDb()
      .update(leads)
      .set({ status })
      .where(eq(leads.id, parseInt(id)))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}