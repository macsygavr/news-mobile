import React, { FC } from "react";
import css from "./index.module.css";
import { format } from "date-fns";
import { clearDateFromTimeZone } from "../../helpers";

type Props = {
  imgUrl: string;
  source: string;
  text: string;
  date: Date;
  url: string;
};

const NewsItem: FC<Props> = ({ imgUrl, source, text, url, date }) => {
  const dateWithoutTimeZone = clearDateFromTimeZone(date);
  const formattedDate = format(dateWithoutTimeZone, "MMM dd, yyyy, hh.mm a");
  const handleOnNewsClick = () => window.open(url);

  return (
    <div className={css.container} onClick={handleOnNewsClick}>
      <div className={css.imgContainer}>
        <img className={css.img} src={imgUrl} alt="" />
      </div>
      <div className={css.newsContentContainer}>
        <span className={css.source}>{source}</span>
        <span className={css.text}>{text}</span>
        <span className={css.date}>{formattedDate}</span>
      </div>
    </div>
  );
};

export default NewsItem;
