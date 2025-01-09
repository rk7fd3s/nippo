import { TZDate } from "@date-fns/tz";

export type ArticleDao = {
    id: number;
    nippo_at: string;
    content: string;
    start_time: string;
    end_time: string;
    time_optional: string;
    thoughts: string;
    created_at: string;
}

export type Article = {
    id: number;
    nippo_at: TZDate; // date部分のみ使用
    content: string;
    start_time: TZDate; // time部分のみ使用
    end_time: TZDate; // time部分のみ使用
    time_optional: string;
    thoughts: string;
    created_at: TZDate;
}
