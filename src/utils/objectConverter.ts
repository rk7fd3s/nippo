import { ArticleDao, Article, ArticleCms, ArticlePostCms } from "@/app/types";
import { TZDate } from "@date-fns/tz";

/**
 * DBから取得したデータをArticle型に変換
 *
 * @param articleDao DBから取得したデータ
 * @returns Article型データ
 */
export const dao2Article = (articleDao: ArticleDao): Article => {
  return {
    id: articleDao.id + "",
    nippo_at: new TZDate(articleDao.nippo_at),
    content: articleDao.content,
    start_time: new TZDate(articleDao.nippo_at + "T" + articleDao.start_time),
    end_time: new TZDate(articleDao.nippo_at + "T" + articleDao.end_time),
    time_optional: articleDao.time_optional,
    thoughts: articleDao.thoughts,
    created_at: new TZDate(articleDao.created_at),
  };
};

export const cms2Article = (article: ArticleCms): Article => {
  return {
    id: article.id,
    nippo_at: new TZDate(article.nippo_at),
    content: article.content,
    start_time: new TZDate(article.start_time),
    end_time: new TZDate(article.end_time),
    time_optional: article.time_optional,
    thoughts: article.thoughts,
    created_at: new TZDate(article.createdAt),
  };
};

export const article2PostBody = (article: any): ArticlePostCms => {
  return {
    nippo_at: article.nippo_at,
    content: article.content,
    start_time: new TZDate(
      article.nippo_at + "T" + article.start_time
    ).toISOString(),
    end_time: new TZDate(
      article.nippo_at + "T" + article.end_time
    ).toISOString(),
    time_optional: article.time_optional,
    thoughts: article.thoughts,
  };
};
