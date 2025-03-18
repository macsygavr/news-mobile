import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./reducers/categoryReducer";
import newsReducer from "./reducers/newsReducer";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    news: newsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
