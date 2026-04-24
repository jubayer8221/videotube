import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import videoReducer from "./videoSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    video: videoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
