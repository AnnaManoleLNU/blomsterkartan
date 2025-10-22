import { configureStore } from "@reduxjs/toolkit";
import { blobsApi } from "./blobsApi";
import { flowersApi } from "./flowersApi";

export const store = configureStore({
  reducer: {
    blobsApi: blobsApi.reducer,
    flowersApi: flowersApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(blobsApi.middleware, flowersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
