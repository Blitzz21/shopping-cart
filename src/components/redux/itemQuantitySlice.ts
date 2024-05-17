import { createSlice } from "@reduxjs/toolkit";

interface itemQuantityState {
    value: number;
};

const initialState: itemQuantityState = {
    value: 0,
};

const itemQuantitySlice = createSlice ({
    name: 'itemQuantity',
    initialState,
    reducers: {
        increaseitemQuantity: (state) => {
            state.value += 1;
        },
    }
}
);

export const { increaseitemQuantity } = itemQuantitySlice.actions;
export default itemQuantitySlice.reducer;