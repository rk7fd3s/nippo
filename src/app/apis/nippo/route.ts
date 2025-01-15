import { getList, postDetail } from "@/utils/microcms";
import { article2PostBody, cms2Article } from "@/utils/objectConverter";
import { NextResponse } from "next/server";

/**
 * 日報データ全件取得
 * @param req リクエスト
 * @param res レスポンス
 * @returns レスポンス
 */
export async function GET(req: Request, res: Response) {
  // 登録降順に全データ取得
  const { data, error } = await getList({
    orders: "-createdAt",
  });

  if (error) {
    return NextResponse.json(error);
  }
  if (!data) {
    return NextResponse.json(error);
  }

  try {
    return NextResponse.json(
      data.map((dao) => cms2Article(dao)),
      { status: 200 }
    );
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
  const item: any = await req.json();
  const reqBody = article2PostBody(item);

  const { id, error } = await postDetail(reqBody);

  if (error) {
    const match = error.toString().match(/status: (\d{3})/);
    if (match) {
      const status = match[1];
      return NextResponse.json({ message: error.toString() }, { status });
    } else {
      return NextResponse.json({ message: error.toString() }, { status: 500 });
    }
  }

  return NextResponse.json(id, { status: 201 });
}
