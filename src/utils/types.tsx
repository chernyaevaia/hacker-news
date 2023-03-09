export interface NewsItem {
    id: number,
    title: string,
    by: string,
    time: string,
    score: string
    descendants: number,
    url: string,
    kids: number[]
}