import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function GET(req: Request, context: { params: { id: string } }) {
  const { params } = await context; // params is available synchronously here
  const { id } = await params;

  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { params } = await context;
  const { id } = await params;

  const body = await req.json();
  const { title, description, rating } = body;

  const { data, error } = await supabase
    .from("movies")
    .update({ title, description, rating })
    .eq("id", Number(id))
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  const { params } = await context;
  const { id } = await params;

  const { data, error } = await supabase
    .from("movies")
    .delete()
    .eq("id", Number(id))
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Movie deleted" });
}
