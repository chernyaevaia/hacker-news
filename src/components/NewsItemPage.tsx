import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
    <>
      <Link to={'/'}><Button sx={{ mt: 3, ml: 5 }} variant="contained" size="large">
        BACK
      </Button></Link>
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>{newsItem?.title}</h2>
        <Typography className={styles.date} variant="overline">
          published{" "}
          {newsItem?.time && new Date(+newsItem.time * 1000).toLocaleString()}
        </Typography>
        <Typography variant="overline" gutterBottom>
          by {newsItem?.by}
        </Typography>
        <Typography className={styles.source} variant="body2" gutterBottom>
          source:<a href={newsItem?.url}> {newsItem?.url}</a>
        </Typography>
        <Button sx={{ mt: 3}}variant="outlined">{newsItem?.descendants} comments</Button>
      </div>
    </>
  );
}
