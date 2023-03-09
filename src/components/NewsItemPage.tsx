import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { restApiService } from "../utils/RestApiService";
import { NewsItem } from "../utils/types";
import styles from "./NewsItemPage.module.css";

export function NewsItemPage() {
  const [newsItem, setNewsItem] = useState<NewsItem>();

  const { id } = useParams();

  useEffect(() => {
    id && restApiService.getNewsItem(id).then((data) => setNewsItem(data));
  });

  return (
    <div className={styles.wrapper}>
      <h2>{newsItem?.title}</h2>
      <Typography variant="overline">
        published{" "}
        {newsItem?.time && new Date(+newsItem.time * 1000).toLocaleString()}
      </Typography>
      <Typography variant="overline" gutterBottom>
        by {newsItem?.by}
      </Typography>
      <Typography variant="caption" gutterBottom>
        source:<a href={newsItem?.url}> {newsItem?.url}</a>
      </Typography>
      <Typography variant="body1" gutterBottom>
        {newsItem?.descendants} comments
      </Typography>
    </div>
  );
}
