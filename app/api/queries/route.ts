import { NextResponse } from "next/server";
import { BACKEND_API_URL, type QueryItem } from "../../types";

export async function GET() {
  try {
    const response = await fetch(BACKEND_API_URL, {
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not load queries from the backend." },
      { status: 502 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QueryItem;

    const response = await fetch(BACKEND_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not submit the query to the backend." },
      { status: 502 },
    );
  }
}
