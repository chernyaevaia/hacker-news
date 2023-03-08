import React from 'react'

export interface NewsCardProps {
    title: string,
    author: string,
    date: string,
    rating: string,
}

export  function NewsCard(news: NewsCardProps) {
  return (
    <div>
        <span>{news.title}</span>
        <span>{news.author}</span>
        <span>{news.date}</span>
        <span>{news.rating}</span>
    </div>
  )
}
