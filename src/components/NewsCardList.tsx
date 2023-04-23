import { Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { restApiService } from "../utils/RestApiService";
import { NewsItem } from "../utils/types";
import { NewsCard } from "./NewsCard";
import styles from "./NewsCardList.module.css";

export function NewsCardList() {
  const [latestNews, setLatestNews] = useState<NewsItem[]>();
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    restApiService.getNews().then((data) => {
      setLatestNews(data);
      setIsLoading(false);
    });
    const interval = setInterval(() => {
      restApiService.getNews().then((data) => {
        setLatestNews(data);
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [isRefresh]);

  return (
    <>
      <div className={styles.topContainer}>
        <Typography variant="h2" gutterBottom>
          NEWS WEBSITE
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => setIsRefresh(!isRefresh)}
        >
          UPDATE NEWS
        </Button>
      </div>
      <div className={styles.container}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          latestNews &&
          latestNews.map((news) => (
            <Link key={news.id} to={`${news.id}`}>
              <NewsCard
                key={news.id}
                author={news.by}
                title={news.title}
                date={news.time}
                rating={news.score}
                descendants={news.descendants}
              />
            </Link>
          ))
        )}
      </div>
    </>
  );
}
