import { setLoading } from "~/store/features/common";
import { useDispatch } from "react-redux";
import { getProductBySlug } from "~/api/fetchProducts";
import store from "~/store/store";

export const loadProductBySlug = async ({ params }: any) => {
  try {
    store.dispatch(setLoading(true));
    const product = params?.slug ? await getProductBySlug(params.slug) : null;
    store.dispatch(setLoading(false));
    // console.log("Product loaded:", product?.result?.[0]);
    
    return product?.[0];
  } catch (error) {
    console.error("Error loading product by slug:", error);
  }
};