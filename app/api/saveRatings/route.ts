import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

let storedRatings: Record<string, number>;
let rankedProviders: any[] | null = null; // Store ranked results globally

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    storedRatings = body;
    console.log("Received ratings:", storedRatings);

    // Fetch providers from Supabase
    const { data: providers, error } = await supabase.from("providers").select();

    if (error || !providers) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json({ error: "Failed to fetch providers" }, { status: 500 });
    }

    // Rank providers based on user input
    rankedProviders = rankProviders(storedRatings, providers);
    console.log("Ranked Providers:", rankedProviders);

    return NextResponse.json({ rankedProviders }, { status: 200 });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to save ratings" }, { status: 500 });
  }
}

export async function GET() {
  if (!rankedProviders) {
    return NextResponse.json({ message: "No rankings found yet." }, { status: 200 });
  }

  return NextResponse.json({ rankedProviders }, { status: 200 });
}

function rankProviders(userRatings: Record<string, number>, providers: any[]) {
  return providers
    .map((provider) => {
      let similarityScore = 0;

      Object.keys(userRatings).forEach((category) => {
        // Match provider fields to user ratings
        const providerKey = mapCategoryName(category);

        if (providerKey in provider) {
          similarityScore += 100 - Math.abs(userRatings[category] - provider[providerKey]);
        }
      });

      return { ...provider, similarityScore };
    })
    .sort((a, b) => b.similarityScore - a.similarityScore);
}

// Helper function to map category names to database fields
function mapCategoryName(category: string) {
  const mappings: Record<string, string> = {
    "Content Coverage": "contentQuality",
    "Practice Resources": "practiseMaterial",
    "Flexibility and Accessibility": "flexibilityAccessibility",
    "Student Support": "studentPortal",
    "Cost-effectiveness": "costEffectiveness",
  };

  return mappings[category] || category;
}

