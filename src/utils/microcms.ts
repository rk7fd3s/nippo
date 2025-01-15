import { ArticleCms, ArticlePostCms } from "@/app/types";
import { createClient } from "microcms-js-sdk";
import type { MicroCMSQueries } from "microcms-js-sdk";

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

// Initialize Client SDK.
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

type ListResponse = {
  data: ArticleCms[] | null;
  error: any;
};

type DetailResponse = {
  data: ArticleCms | null;
  error: any;
};

type DetailPostResponse = {
  id: string | null;
  error: any;
};

// ブログ一覧を取得
export const getList = async (queries?: MicroCMSQueries) => {
  const res: ListResponse = { data: null, error: null };

  await client
    .getList<ArticleCms>({
      endpoint: "articles",
      queries,
    })
    .then((data) => {
      res.data = data.contents;
    })
    .catch((error) => {
      res.error = error;
    });

  return res;
};

// ブログの詳細を取得
export const getDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const res: DetailResponse = { data: null, error: null };

  await client
    .getListDetail<ArticleCms>({
      customRequestInit: {
        cache: "no-store", // キャッシュを利用せずに常に新しいデータを取得する
       },
      endpoint: "articles",
      contentId,
      queries,
    })
    .then((data) => {
      res.data = data;
    })
    .catch((error) => {
      res.error = error;
    });

  return res;
};

export const postDetail = async (reqBody: ArticlePostCms) => {
  const res: DetailPostResponse = { id: null, error: null };

  await client
    .create({
      endpoint: "articles",
      content: reqBody,
    })
    .then((data) => {
      res.id = data.id;
    })
    .catch((error) => {
      res.error = error;
    });

  return res;
};
