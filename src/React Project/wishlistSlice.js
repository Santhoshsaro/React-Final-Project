import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addToWishlist: (state, action) => {
      const alreadyAdded = state.find(
        (item) => item.id === action.payload.id
      );

      if (!alreadyAdded) {
        state.push(action.payload);
      }
    },

    removeFromWishlist: (state, action) => {
      return state.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addToWishlist, removeFromWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;