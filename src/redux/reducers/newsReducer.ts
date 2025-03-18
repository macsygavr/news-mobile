import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Category, News, NewsResponse } from "../types";
import { getNews, getNewsByCategory } from "../../api/api";

interface NewsState {
  news: News[];
  page: number;
  loading: boolean;
  hasMore: boolean;
  error: string | null;
  date: string;
}

const initialState: NewsState = {
  news: [],
  page: 0,
  loading: false,
  hasMore: true,
  error: null,
  date: new Date().toISOString(),
};

export const fetchNews = createAsyncThunk<NewsResponse, string>(
  "fetchNews",
  (date: string) => getNews(date)
);

export const fetchNewsByCategory = createAsyncThunk<
  NewsResponse,
  { category: Category; page: number }
>("fetchNewsByCategory", ({ category, page }) =>
  getNewsByCategory({ category, page })
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    decrementDate: (state) => {
      const currentDate = new Date(state.date);
      currentDate.setDate(currentDate.getDate() - 1);

      state.date = currentDate.toISOString();
    },
    incrementPage: (state) => {
      state.page = state.page + 1;
    },
    resetNewsState: (state) => {
      state.news = [];
      state.loading = false;
      state.error = null;
      state.date = new Date().toISOString();
      state.hasMore = true;
      state.page = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.hasMore = state.news.length <= action.payload.totalResults;

        const urls = state.news.map((item) => item.url);

        const filteredNews = action.payload.articles?.filter(
          (item) => !urls.includes(item.url)
        );

        state.news = [...state.news, ...(filteredNews ?? [])];
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "";
      })

      .addCase(fetchNewsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.hasMore = state.news.length <= action.payload.totalResults;

        const urls = state.news.map((item) => item.url);

        const filteredNews = action.payload.articles?.filter(
          (item) => !urls.includes(item.url)
        );

        state.news = [...state.news, ...(filteredNews ?? [])];
      })
      .addCase(fetchNewsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "";
      });
  },
});

export const { decrementDate, incrementPage, resetNewsState } = newsSlice.actions;

export default newsSlice.reducer;
