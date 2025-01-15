import { getDetail } from "@/utils/microcms";
import { cms2Article } from "@/utils/objectConverter";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
  res: Response
) {
  const { id } = await params;

  // supabaseからidにマッチしたデータ取得
  const { data, error } = await getDetail(id);

  if (error) {
    const match = error.toString().match(/status: (\d{3})/);
    if (match) {
      const status = match[1];
      if (status !== "404") {
        return NextResponse.json({ message: error.toString() }, { status });
      }
    } else {
      return NextResponse.json({ message: error.toString() }, { status: 500 });
    }
  }

  if (!data) {
    notFound();
  }

  try {
    return NextResponse.json(cms2Article(data), { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
