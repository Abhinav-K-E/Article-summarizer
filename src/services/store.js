import { configureStore } from "@reduxjs/toolkit";

//step-2
import { articleApi } from "./article";

// stor is a global state
export const store = configureStore(
    {
        reducer : {
            [articleApi.reducerPath] : articleApi.reducer //get something from api
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)
    
    }
);