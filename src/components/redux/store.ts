import { configureStore } from "@reduxjs/toolkit";
import cartQuantitySlice from "./cartQuantitySlice";

export const store = configureStore ({
    reducer: {
        cartQuantity: cartQuantitySlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;