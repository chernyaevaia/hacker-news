import React from "react";
import { Button, Card, Typography } from "@mui/material";
import styles from "./NewsCard.module.css";

export interface NewsCardProps {
  title: string;
  author: string;
  date: string;
  rating: string;
}

export function NewsCard(news: NewsCardProps) {
  return (
    <Card variant="outlined" className={styles.card}>
      <Typography className={styles.date} variant="caption" display="block">
        published {new Date(+news.date * 1000).toLocaleString()}
      </Typography>
      <Typography variant="h6">{news.title}</Typography>
      <Typography variant="caption" display="block" gutterBottom>
        by {news.author}
      </Typography>
      <Typography className={styles.rating} variant="body2" gutterBottom>
        {news.rating} points
      </Typography>
      <Button variant="contained" size="medium">
        Learn More
      </Button>
    </Card>
  );
}
