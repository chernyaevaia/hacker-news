export interface NewsItem {
  id: number;
  title: string;
  by: string;
  time: string;
  score: string;
  descendants: number;
  url: string;
  kids: number[];
}

export interface CommentItem {
  id: number;
  text: string;
  by: string;
  time: string;
  parent: number;
  kids: number[];
}
