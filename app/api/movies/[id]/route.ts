import { NextResponse } from "next/server";

const API_URL = process.env.API as string;

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(`${API_URL}/${params.id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Movie not found");
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch movie" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    await fetch(`${API_URL}/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return NextResponse.json({ message: "Movie updated" });
  } catch {
    return NextResponse.json({ error: "Failed to update movie" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await fetch(`${API_URL}/${params.id}`, { method: "DELETE" });
    return NextResponse.json({ message: "Movie deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete movie" }, { status: 500 });
  }
}
