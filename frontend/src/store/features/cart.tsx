import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type CartItem = {
    productId : string;
    name: string;
    quantity: number;
    price: number;
    variantId: string;
    variant?: {id : string ; size : string; color : string};
}

type CartState = {
    cart: CartItem[]
}
const initialState: CartState = {
    cart: JSON.parse(localStorage.getItem('cart') ?? '[]')
}

const cartSlice = createSlice({
    name: 'cartState',
    initialState: initialState,
    reducers: {
        addToCart(state, action){
            state.cart.push(action?.payload);
        },
        removeFromCart(state, action: PayloadAction<{ productId: string; variantId: string }>) {
            console.log("Cart before removal:", JSON.parse(JSON.stringify(state.cart)));
            const updatedCart = state.cart.filter(
                item => item?.productId !== action.payload.productId && item?.variant?.id !== action?.payload?.variantId
              );
            console.log("Updated cart after removal:", updatedCart);
            state.cart = updatedCart;
            localStorage.setItem('cart', JSON.stringify(state.cart));
          },
        updateQuantity(state, action){
           return {
            ...state , 
            cart : state?.cart?.map ((item : any) => {
                if (item?.variant?.id === action?.payload?.variantId){
                    return {
                        ...item , 
                        quantity : action?.payload?.quantity,
                        subTotal : action?.payload?.quantity * item.price
                    }
                }
                return item;
            })
           }
        },
    }
    
})

export const {addToCart , removeFromCart , updateQuantity} = cartSlice?.actions;
export const countCartItems = (state : { cartState: CartState}) => state?.cartState?.cart?.length
export const selectCartItems = (state : { cartState : CartState}) => state?.cartState?.cart ??  []
export default cartSlice.reducer;


// state là gì?
// state là trạng thái hiện tại của slice đó.
// Trong trường hợp này, state = { cart: [] }.
// Bạn có thể truy cập state.cart, vì nó đang là state.cart: [].
// 👉 Trong hàm reducer (addToCart), state đại diện cho:
// {
//   cart: [...] 
// }
// ✅ action là gì?
// action chứa thông tin được gửi từ component khi dispatch một action.
// Có dạng:
// {
//   type: "cartSlice/addToCart",
//   payload: dữ liệu mà bạn gửi vào
// }
// 👉 Ví dụ trong component:
// dispatch(addToCart({ id: 1, name: "Giày Nike", quantity: 2 }));
// Thì trong reducer addToCart(state, action), bạn có thể lấy dữ liệu đó qua:
// action.payload = { id: 1, name: "Giày Nike", quantity: 2 }