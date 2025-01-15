import Error from "@/app/error";
import { Article } from "@/app/types";
import {
  format,
  formatISO9075
} from "date-fns";
import { notFound } from "next/navigation";
import React from "react";

const DetailArticlePage = async ({ params }: { params: { id: string } }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { id } = await params;

  try {
    const res = await fetch(`${API_URL}/apis/nippo/${id}`, {
      next: { revalidate: 30 },
    });

    if (res.ok) {
      const detailArticle: Article = await res.json();
      const cuurent_date = new Date();

      return (
        <div className="py-8 px-4 md:px-12">
          <h2 className="text-2xl font-bold mb-4">
            {format(detailArticle.nippo_at, "yyyy年MM月dd日")}
          </h2>

          <div className="flex">
            <div className="w-24 flex-none">研修時間</div>
            <div className="flex flex-wrap">
              <div className="pe-1">
                {format(detailArticle.start_time, "HH:mm")}～
                {format(detailArticle.end_time, "HH:mm")}
              </div>
              {detailArticle.time_optional && (
                <div className="whitespace-break-spaces">
                  ({detailArticle.time_optional})
                </div>
              )}
            </div>
          </div>
          <div className="flex">
            <div className="w-24 flex-none">研修内容</div>
            <div className="grow whitespace-break-spaces">
              {detailArticle.content}
            </div>
          </div>
          <div className="flex">
            <div className="w-24 flex-none">今日の感想</div>
            <div className="grow whitespace-break-spaces">
              {detailArticle.thoughts}
            </div>
          </div>
          <div className="text-end">
            Updated {formatISO9075(detailArticle.created_at)}
          </div>
        </div>
      );
    }
  } catch (error: any) {
    return <Error {...error} />;
  }
  notFound();
};

export default DetailArticlePage;
