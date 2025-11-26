import { configureStore } from "@reduxjs/toolkit";
import { blobsApi } from "./blobsApi";
import { flowersApi } from "./flowersApi";
import { userApi } from "./userApi";

export const store = configureStore({
  reducer: {
    blobsApi: blobsApi.reducer,
    flowersApi: flowersApi.reducer,
    userApi: userApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(blobsApi.middleware, flowersApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
