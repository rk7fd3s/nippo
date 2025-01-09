import { ArticleDao } from "@/app/types";
import { dao2Article } from "@/utils/objectConverter";
import { supabase } from "@/utils/supabaseClient";
import { NextResponse } from "next/server";

/**
 * 日報データ全件取得
 * @param req リクエスト
 * @param res レスポンス
 * @returns レスポンス
 */
export async function GET(req: Request, res: Response) {
  // supabaseから登録降順に全データ取得
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(error);
  }
  if (!data) {
    return NextResponse.json(error);
  }

  try {
    return NextResponse.json(data.map(dao => dao2Article(dao)), { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}

/**
 * 新規登録
 * @param req リクエスト
 * @param res レスポンス
 * @returns レスポンス
 */
export async function POST(req: Request, res: Response) {
  const item: ArticleDao = await req.json();

  // id, created_atを抜いたオブジェクトを生成
  const {id, created_at, ...reqBody} = item;

  // supabaseにデータ登録
  const { data, error } = await supabase
    .from("posts")
    .insert([reqBody]);

  if (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json(data, { status: 201 });
}

