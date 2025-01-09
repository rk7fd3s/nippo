import React from "react";
import { Article } from "../types";
import {
  format,
  formatISO9075,
  formatDistanceToNowStrict,
  sub,
  isBefore,
} from "date-fns";
import Link from "next/link";

type ArticleCardProps = {
  article: Article;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  const cuurent_date = new Date();

  return (
    <div>
      <Link href={`/detail/${article.id}`}>
        <article className="flex flex-col text-md bg-gray-400 shadow rounded my-4 p-2 min-w-60">
          <div className="mb-2 border-b-2 border-gray-500">
            <div className="text-3xl">
              {format(article.nippo_at, "yyyy年MM月dd日")}
            </div>
          </div>
          <div className="flex">
            <div className="w-24 flex-none">研修時間</div>
            <div className="flex flex-wrap">
              <div className="pe-1">
                {format(article.start_time, "HH:mm")}～
                {format(article.end_time, "HH:mm")}
              </div>
              {article.time_optional && (
                <div className="whitespace-break-spaces">
                  ({article.time_optional})
                </div>
              )}
            </div>
          </div>
          <div className="flex">
            <div className="w-24 flex-none">研修内容</div>
            <div className="grow whitespace-break-spaces">
              {article.content.length > 30
                ? article.content.substring(0, 30) + "..."
                : article.content}
            </div>
          </div>
          <div className="flex">
            <div className="w-24 flex-none">今日の感想</div>
            <div className="grow whitespace-break-spaces">
              {article.thoughts.length > 30
                ? article.thoughts.substring(0, 30) + "..."
                : article.thoughts}
            </div>
          </div>
          <div className="text-end">
            Updated{" "}
            {isBefore(article.created_at, sub(cuurent_date, { days: 1 }))
              ? formatISO9075(article.created_at)
              : formatDistanceToNowStrict(article.created_at, {
                  addSuffix: true,
                })}
          </div>
        </article>
      </Link>
    </div>
  );
};

export default ArticleCard;
