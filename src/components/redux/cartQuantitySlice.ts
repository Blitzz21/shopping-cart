import { createSlice } from "@reduxjs/toolkit";

interface cartQuantityState {
    value: number;
};

const initialState: cartQuantityState = {
    value: 0,
};

const cartQuantitySlice = createSlice ({
    name: 'cartQuantity',
    initialState,
    reducers: {
        increaseCartQuantity: (state) => {
            state.value += 1;
        },
        decreaseCartQuantity: (state) => {
            if (state.value > 0) {
            state.value -= 1;
            }
        },
        resetCartQuantity: (state) => {
            state.value = 0;
          },
    }
});

export const { increaseCartQuantity, decreaseCartQuantity, resetCartQuantity } = cartQuantitySlice.actions;
export default cartQuantitySlice.reducer;