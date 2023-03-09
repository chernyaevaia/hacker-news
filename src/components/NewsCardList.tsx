import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { restApiService } from "../utils/RestApiService";
import { NewsItem } from "../utils/types";
import { NewsCard } from "./NewsCard";
import styles from "./NewsCardList.module.css";

export function NewsCardList() {
  const [latestNews, setLatestNews] = useState<NewsItem[]>();
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  useEffect(() => {
    restApiService.geNewsItems().then((data) => setLatestNews(data));

    const interval = setInterval(() => {
      restApiService.geNewsItems().then((data) => setLatestNews(data));
    }, 60000);
    return () => clearInterval(interval);
  }, [isRefresh]);

  return (
    <>
    <div className={styles.topContainer}>
      <Typography variant="h2" gutterBottom>
        NEWS WEBSITE
      </Typography>
      <Button variant="contained" size="large" onClick={() => setIsRefresh(!isRefresh)}>
        UPDATE NEWS
      </Button></div>
      <div className={styles.container}>
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
      </div>
    </>
  );
}
