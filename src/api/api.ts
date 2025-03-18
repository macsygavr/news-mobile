import axios from "axios";
import { Category, NewsResponse } from "../redux/types";

const basePath = "https://newsapi.org/v2";
const apiKey = "437d56ac923d42eaa1bf90c3a7e9ecff";

export const getNews = (date: string): Promise<NewsResponse> =>
  axios
    .get(
      `${basePath}/everything?sources=cnn,politico,usa-today&language=en&from=${date}&to=${date}&pageSize=4`,
      {
        headers: {
          "X-Api-Key": apiKey,
        },
      }
    )
    .then((data) => data.data)
    .catch((err) => err);

export const getNewsByCategory = ({
  category,
  page,
}: {
  category: Category;
  page: number;
}): Promise<NewsResponse> =>
  axios
    .get(
      `${basePath}/top-headlines?category=${category}&language=en&page=${page}`,
      {
        headers: {
          "X-Api-Key": apiKey,
        },
      }
    )
    .then((data) => data.data)
    .catch((err) => err);
