import {
  Button,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { restApiService } from "../utils/RestApiService";
import { CommentItem, NewsItem } from "../utils/types";
import styles from "./NewsItemPage.module.css";

export function NewsItemPage() {
  const [newsItem, setNewsItem] = useState<NewsItem>();
  const [comments, setComments] = useState<CommentItem[]>();

  const { id } = useParams();

  useEffect(() => {
    id && restApiService.getNewsItem(id).then((data) => setNewsItem(data));
    id && restApiService.getComments(+id).then((data) => setComments(data));
  });

  return (
    <>
      <Link to={"/"}>
        <Button sx={{ mt: 3, ml: 5 }} variant="contained" size="large">
          BACK
        </Button>
      </Link>
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
        <Typography sx={{ mt: 2 }} variant="body2">
          {newsItem?.descendants} comments
        </Typography>
      </div>
      <div className={styles.commentWrapper}>
      <List
        sx={{ bgcolor: "background.paper", maxWidth: 600 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Comments
          </ListSubheader>
        }
      />
      {comments &&
        comments.map((comment) => (
          <ListItemButton sx={{ bgcolor: "background.paper", maxWidth: 600 }}>
            <ListItemText
              className={styles.comment}
              sx={{ bgcolor: "background.paper", maxWidth: 600 }}
              primary={comment.text}
            />
          </ListItemButton>
        ))}
        </div>
    </>
  );
}
