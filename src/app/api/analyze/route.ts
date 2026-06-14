import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Review from "@/models/Review";
import { analyzeReview } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { reviewText } = body;

    // Validate reviewText exists and meets minimal length requirements
    if (!reviewText || typeof reviewText !== "string") {
      return NextResponse.json(
        { success: false, error: "Review text is required." },
        { status: 400 }
      );
    }

    const trimmedText = reviewText.trim();
    if (trimmedText.length < 10) {
      return NextResponse.json(
        { success: false, error: "Review text must be at least 10 characters long." },
        { status: 400 }
      );
    }

    // Call Gemini API (or heuristic fallback) to perform sentiment, category, and reply generation
    const analysis = await analyzeReview(trimmedText);

    // Save analyzed review to the database
    const savedReview = new Review({
      reviewText: trimmedText,
      sentiment: analysis.sentiment,
      category: analysis.category,
      aiResponse: analysis.aiResponse,
      createdAt: new Date(),
    });

    await savedReview.save();

    return NextResponse.json(
      {
        success: true,
        data: savedReview,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error in /api/analyze:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
