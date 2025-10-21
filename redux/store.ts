import { configureStore } from "@reduxjs/toolkit";
import { blobsApi } from "./blobsApi";

export const store = configureStore({
  reducer: {
    blobsApi: blobsApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(blobsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
