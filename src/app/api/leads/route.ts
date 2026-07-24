import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { leadSchema } from "@/lib/validation";
import { getDb } from "@/db";
import { leads } from "@/db/schema";

export async function GET() {
  try {
    const allLeads = await getDb()
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt));

    return NextResponse.json(allLeads);
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { name, email, budget, message } = parsed.data;

    const [lead] = await getDb()
      .insert(leads)
      .values({
        name,
        email,
        budget,
        message,
        status: "NEW",
        createdAt: new Date(),
      })
      .returning();

    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    console.error("Failed to create lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}