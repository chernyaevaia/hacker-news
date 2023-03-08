import { useEffect, useState } from "react";
import { NewsItem } from "../utils/types";
import { NewsCard } from "./NewsCard";

export function NewsCardList() {
  const [newsIds, setNewsIds] = useState<number[]>();
  const [latestNews, setLatestNews] = useState<NewsItem[]>();

  const getIds = async () => {
    return await fetch(`https://hacker-news.firebaseio.com/v0/newstories.json`)
      .then((res) => res.json())
      .then((data: number[]) => data.filter((id: number, i: number) => i < 100))
      .then((data) => setNewsIds(data))
      .catch((e) => console.log(e));
  };
  //getIds()
  let urls =
    newsIds &&
    newsIds?.map(
      (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
  let requests = urls && urls.map((url) => fetch(url));

  requests &&
    Promise.all(requests).then((responses) =>
      Promise.all(responses.map((r) => r.json())).then((news) =>
        setLatestNews(news)
      )
    );
  console.log(newsIds);
  console.log(urls);
  console.log(requests);


  // useEffect(() => {
  //   getIds();
  // }, []);

  return (
    <>
      {latestNews &&
        latestNews.map((news) => (
          <NewsCard
            author={news.by}
            title={news.title}
            date={news.time}
            rating={news.score}
          />
        ))}
    </>
  );
}
