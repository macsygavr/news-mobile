import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../types";

interface CategoryState {
  category: Category | null;
}

const initialState: CategoryState = {
  category: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { changeCategory } = categorySlice.actions;

export default categorySlice.reducer;
