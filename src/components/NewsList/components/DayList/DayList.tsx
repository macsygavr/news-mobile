import React, { FC } from "react";
import css from "./index.module.css";
import NewsItem from "../NewsItem/NewsItem";
import { News } from "../../../../redux/types";

type Props = {
  date: string;
  news: News[];
};

const DayList: FC<Props> = ({ date, news }) => {
  return (
    <div className={css.container}>
      <span className={css.date}>{`News for ${date}`}</span>
      <div className={css.newsList}>
        {news.map((item, index) => (
          <NewsItem
            key={`${item.title}-${index}`}
            imgUrl={item.urlToImage}
            source={item.source.name}
            text={item.description}
            url={item.url}
            date={item.publishedAt}
          />
        ))}
      </div>
    </div>
  );
};

export default DayList;
