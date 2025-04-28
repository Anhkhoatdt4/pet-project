import { addToCart, removeFromCart, updateQuantity} from "~/store/features/cart"; 
import { Dispatch } from "redux";

export const addItemToCartAction = (product : any) => {
    return (dispatch : Dispatch, getState :  () => any) => {
      dispatch(addToCart(product));
      const state = getState();
      console.log('Full state:', state);
      if (state.cartState) {
        updateLocalStorage(state);
      }
    };
  };
  
  const updateLocalStorage = (state : any) => {
    const { cartState } = state;
    localStorage.setItem('cart', JSON.stringify(cartState?.cart));
  };
  
export const updateCartAction = (variantId: string, quantity: number) => {
  return (dispatch: Dispatch, getState: () => any) => {
    dispatch(updateQuantity({
      variantId: variantId,
      quantity: quantity
    }));
    const state = getState();
    updateLocalStorage(state);
  };
};

export const deleteItemFromCart = (item : any) => {
  return (dispatch : Dispatch , getState : () => any) => {
    dispatch(removeFromCart(item));

  }
}


