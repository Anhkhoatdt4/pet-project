import { configureStore} from "@reduxjs/toolkit";
import productReducer from "./features/product";
import commonReducer from "./features/common";
import categoryReducer from "./features/category";

const store = configureStore({
    reducer: {
        productState: productReducer,
        commonState: commonReducer,
        categoryState: categoryReducer,
    },
});

export default store;


