import React from "react";
import { Article } from "../types";
import { format } from "date-fns";
import { TZDate } from "@date-fns/tz";

type ArticleCardProps = {
  article: Article;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  const formated_nippo_at = format(
    new TZDate(article.nippo_at, "+00:00"),
    "yyyy年MM月dd日"
  );
  const formated_start_time = format(
    new TZDate("2000-01-01T" + article.start_time + "Z", "+00:00"),
    "HH:mm"
  );
  const formated_end_time = format(
    new TZDate("2000-01-01T" + article.end_time + "Z", "+00:00"),
    "HH:mm"
  );

  return (
    <div>
      <article className="flex flex-col text-md bg-gray-400 shadow rounded my-4 p-2 min-w-60">
        <div className="mb-2 border-b-2 border-gray-500">
          <div className="text-3xl">{formated_nippo_at}</div>
        </div>
        <div className="flex">
          <div className="w-24 flex-none">研修時間</div>
          <div className="flex flex-wrap">
            <div className="pe-1">
              {formated_start_time}～{formated_end_time}
            </div>
            {article.time_optional && <div className="whitespace-break-spaces">({article.time_optional})</div>}
          </div>
        </div>
        <div className="flex">
          <div className="w-24 flex-none">研修内容</div>
          <div className="grow whitespace-break-spaces">{article.content}</div>
        </div>
        <div className="flex">
          <div className="w-24 flex-none">今日の感想</div>
          <div className="grow whitespace-break-spaces">{article.thoughts}</div>
        </div>
      </article>
    </div>
  );
};

export default ArticleCard;
