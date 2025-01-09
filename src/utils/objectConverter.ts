import { ArticleDao, Article } from "@/app/types";
import { TZDate } from "@date-fns/tz";

/**
 * DBから取得したデータをArticle型に変換
 * 
 * @param articleDao DBから取得したデータ
 * @returns Article型データ
 */
export const dao2Article = (articleDao: ArticleDao): Article => {
    return {
        id: articleDao.id,
        nippo_at: new TZDate(articleDao.nippo_at),
        content: articleDao.content,
        start_time: new TZDate(articleDao.nippo_at + "T" + articleDao.start_time),
        end_time: new TZDate(articleDao.nippo_at + "T" + articleDao.end_time),
        time_optional: articleDao.time_optional,
        thoughts: articleDao.thoughts,
        created_at: new TZDate(articleDao.created_at),
    };
}
