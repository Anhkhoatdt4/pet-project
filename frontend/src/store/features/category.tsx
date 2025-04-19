import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "categoryState",
    initialState: { categories: [] },
    reducers: {
        loadCategories: (state, action) => {
            return {
                ...state,
                categories: action?.payload,
            }
        }
    }
});

export const { loadCategories } = categorySlice?.actions;
export default categorySlice?.reducer;