import {
  Button,
  CircularProgress,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { restApiService } from "../utils/RestApiService";
import { CommentItem, NewsItem } from "../utils/types";
import styles from "./NewsItemPage.module.css";

export function NewsItemPage() {
  const [newsItem, setNewsItem] = useState<NewsItem>();
  const [comments, setComments] = useState<CommentItem[]>();
  const [replies, setReplies] = useState<CommentItem[]>();
  const [open, setOpen] = useState<boolean>(false);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams();

  const handleClick = (ids: number[]) => {
    !open && restApiService.getReplies(ids).then((data) => setReplies(data));
    setOpen(!open);
  };

  useEffect(() => {
    setIsLoading(true);
    id &&
      restApiService.getNewsItem(id).then((data) => {
        setNewsItem(data);
        setIsLoading(false);
      });
    id &&
      restApiService.getComments(+id).then((data) => {
        setComments(data);
        setIsLoading(false);
      });
  }, [isRefresh, id]);

  return (
    <>
      <Link to={"/"}>
        <Button sx={{ mt: 3, ml: 5 }} variant="contained" size="large">
          BACK
        </Button>
      </Link>
      <div className={styles.wrapper}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <h2 className={styles.heading}>{newsItem?.title}</h2>
            <Typography className={styles.date} variant="overline">
              published{" "}
              {newsItem?.time &&
                new Date(+newsItem.time * 1000).toLocaleString()}
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
          </>
        )}
      </div>
      <div className={styles.commentWrapper}>
        <Button
          variant="contained"
          size="medium"
          onClick={() => setIsRefresh(!isRefresh)}
        >
          UPDATE COMMENTS
        </Button>
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
        {isLoading ? (
          <CircularProgress />
        ) : (
          comments &&
          comments.map((comment) => (
            <>
              <ListItemButton
                onClick={() => handleClick(comment.kids)}
                sx={{ bgcolor: "background.paper", maxWidth: 640 }}
                className={styles.rootComment}
              >
                <ListItemText
                  className={styles.comment}
                  sx={{
                    bgcolor: "background.paper",
                    width: 450,
                    padding: 2,
                  }}
                  primary={comment.text.replace(/<\/?[^>]+>/gi, "")}
                />
                <ListItemText
                  className={styles.comment}
                  sx={{
                    bgcolor: "background.paper",
                    maxWidth: 640,
                    padding: 4,
                  }}
                  primary={
                    (comment.kids ? comment.kids.length : 0) + " replies"
                  }
                />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              {replies &&
                replies.map((reply) => (
                  <Collapse
                    in={open && reply.parent === comment.id}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List
                      sx={{ bgcolor: "background.paper", maxWidth: 640 }}
                      component="div"
                      disablePadding
                    >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText
                          className={styles.comment}
                          primary={reply.text.replace(/<\/?[^>]+>/gi, "")}
                          sx={{ pl: 4 }}
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>
                ))}
            </>
          ))
        )}
      </div>
    </>
  );
}
