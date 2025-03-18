import React, { useEffect, useMemo, useRef } from "react";
import css from "./index.module.css";
import DayList from "./components/DayList/DayList";
import LoadingIcon from "../../assets/LoadingIcon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchNews,
  decrementDate,
  fetchNewsByCategory,
  resetNewsState,
  incrementPage,
} from "../../redux/reducers/newsReducer";
import { format } from "date-fns";
import { News } from "../../redux/types";
import { clearDateFromTimeZone } from "./helpers";

const NewsList = () => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { news, loading, date, hasMore, page } = useSelector(
    (state: RootState) => state.news
  );
  const { category } = useSelector((state: RootState) => state.category);

  const newsList = useMemo(() => {
    const groupedNews = news.reduce<Record<string, News[]>>((acc, item) => {
      const date = clearDateFromTimeZone(item.publishedAt);
      const formattedDate = format(date, "dd.MM.yyyy");

      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }

      // @ts-ignore
      acc[formattedDate].push(item);
      return acc;
    }, {});

    return Object.keys(groupedNews).map((key) => ({
      date: key,
      news: groupedNews[key],
    }));
  }, [news]);

  useEffect(() => {
    dispatch(resetNewsState());
  }, [dispatch, category]);

  const loadMoreNews = (isFromInterval: boolean) => {
    if (loading) return;

    const formattedDate = format(date, "yyyy-MM-dd");
    const dateNow = format(new Date(), "yyyy-MM-dd");

    if (category) {
      dispatch(
        fetchNewsByCategory({ category, page: isFromInterval ? 1 : page })
      );
    } else {
      dispatch(fetchNews(isFromInterval ? dateNow : formattedDate));
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      loadMoreNews(true);
    }, 30000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, [dispatch, category]);

  useEffect(() => {
    if (hasMore) {
      loadMoreNews(false);
    }
    // eslint-disable-next-line
  }, [category, date, page, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          if (category) {
            dispatch(incrementPage());
          } else {
            dispatch(decrementDate());
          }
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        // eslint-disable-next-line
        observer.unobserve(loaderRef.current);
      }
    };
  }, [dispatch, category, hasMore, loading]);

  return (
    <div className={css.container}>
      {newsList.map((item, index) => (
        <DayList
          key={`${item.date}=${index}`}
          date={item.date}
          news={item.news}
        />
      ))}
      {loading && (
        <div className={css.loadingContainer}>
          <div className={css.loadingIconContainer}>
            <LoadingIcon />
          </div>
        </div>
      )}
      <div ref={loaderRef} />
    </div>
  );
};

export default NewsList;
