import { useEffect, useState } from "react";
import { restApiService } from "../utils/RestApiService";
import { NewsItem } from "../utils/types";
import { NewsCard } from "./NewsCard";

export function NewsCardList() {
  const [latestNews, setLatestNews] = useState<NewsItem[]>();

  useEffect(() => {
    restApiService.geNewsItems().then(data => setLatestNews(data))
    }, [])

  return (
    <>
      {latestNews &&
        latestNews.map((news) => (
          <NewsCard
            key={news.id}
            author={news.by}
            title={news.title}
            date={news.time}
            rating={news.score}
          />
        ))}
    </>
  );
}
