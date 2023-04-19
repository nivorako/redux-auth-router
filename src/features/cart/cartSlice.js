import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import cartItems from "../../cartItems";

const url = "https://course-api.com/react-useReducer-cart-project"

const initialState = {
    cartItems : [],
    amount: 4,
    total: 0,
    isLoading: true,
}

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
    const res = await fetch(url);
  try {
    return await res.json();
  } catch (err) {
    return console.error("error :", err);
  }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      clearCart: (state) => {
        state.cartItems = [];
        state.amount = 0
      },
      removeItem : (state, action) => {
        const itemId = action.payload
        const deletedItem = state.cartItems.find((item) => item.id === itemId)
        state.cartItems = state.cartItems.filter((item) => 
            item.id !== itemId
        )
        //console.log("deleted :", deletedItem.amount)
        state.amount = state.amount - deletedItem.amount
      }, 
      increase: (state, action) => {
        const itemId = action.payload
        const cartItem = state.cartItems.find((item) => item.id === itemId);
        cartItem.amount = cartItem.amount + 1;
        state.amount = state.amount + 1
      },
      decrease: (state, action) => {
        const itemId = action.payload
        const cartItem = state.cartItems.find((item) => item.id === itemId);
        cartItem.amount = cartItem.amount - 1 
        state.amount = state.amount - 1
      },
      totalPrice: (state) => {
        let amount = 0
        let total = 0
        state.cartItems.forEach((item) =>{
            amount += item.amount
            total += item.amount*item.price
        })
        state.amount = amount
        state.total = total.toFixed(2)
      }
    },
    extraReducers: {
        [getCartItems.pending] : (state) => {
            state.isLoading = true
        },
        [getCartItems.fulfilled] : (state, action) => {
            // console.log("action :", action)
            state.isLoading = false
            state.cartItems = action.payload
        },
        [getCartItems.rejected] : (state) => {
            state.isLoading = false
        }
    }
  });
  
export const { clearCart, removeItem, increase, decrease, totalPrice } = cartSlice.actions;

export default cartSlice.reducer