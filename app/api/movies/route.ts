import { supabase } from "@/app/lib/supabaseClient";
import { NextResponse } from "next/server";


export async function GET() {
  const { data, error } = await supabase.from("movies").select("*").order("id", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, rating } = body;

  const { data, error } = await supabase
    .from("movies")
    .insert([{ title, description, rating }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
