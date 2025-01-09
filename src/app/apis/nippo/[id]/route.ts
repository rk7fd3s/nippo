import { dao2Article } from "@/utils/objectConverter";
import { supabase } from "@/utils/supabaseClient";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const id = req.url.split("/nippo/")[1];

  // supabaseからidにマッチしたデータ取得
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  if (!data) {
    notFound();
  }

  try {
    return NextResponse.json(dao2Article(data), { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
