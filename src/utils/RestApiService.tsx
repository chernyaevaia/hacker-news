import { CommentItem, NewsItem } from "./types";

export class RestApiService {
  fetchApi(url: string, method: string = "GET", headers?: Object) {
    const params = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    return fetch(url, params).then((res) => {
      if (res.status === 400) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    });
  }

  getNews = (): Promise<NewsItem[]> => {
    return this.fetchApi(
      `https://hacker-news.firebaseio.com/v0/newstories.json`
    )
      .then((data: number[]) => data.filter((id: number, i: number) => i < 100))
      .then((ids) =>
        ids.map((id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      )
      .then((urls) => urls.map((url) => this.fetchApi(url)))
      .then((requests) => Promise.all(requests))
      .then((responses) => Promise.all(responses));
  };

  getNewsItem = (id: string): Promise<NewsItem> => {
    return this.fetchApi(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    )
      .then((res) => res)
      .catch((e) => console.log(e));
  };

  getComments = (id: number): Promise<CommentItem[]> => {
    return this.fetchApi(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    )
      .then((res) => res)
      .then((newsitem) => newsitem.kids)
      .then((commentIds) =>
        commentIds.map(
          (id: number) =>
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        )
      )
      .then((urls) => urls.map((url: string) => this.fetchApi(url)))
      .then((requests) => Promise.all(requests))
      .then((responses) => Promise.all(responses));
  };

  getReplies = (ids: number[]): Promise<CommentItem[]> => {
    const urls = ids
      .map(
        (id: number) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      )
      .map((url: string) => this.fetchApi(url));
    return Promise.all(urls).then((responses) => Promise.all(responses));
  };
}

export const restApiService = new RestApiService();
