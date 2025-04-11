import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "productState",
  initialState: {products : []},
    reducers: {
        
        addProduct: (state, action) => {
        (state.products as any).push(action?.payload);
        },
        loadProducts: (state, action) => {
            return {
                ...state,
                products: action?.payload,
            }
        },
    }
});

export const { addProduct, loadProducts } = productSlice?.actions;
export default productSlice.reducer;