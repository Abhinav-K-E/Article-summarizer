import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const rapidApiKey = process.env.VITE_RAPID_API_ARTICLE_KEY;
const rapidApiKey = `94ef10bb7amsh520083de359adc9p1f7141jsndc284003b543`;

// 1- creating api
export const articleApi = createApi({
    reducerPath: 'articleApi',

        //2- fetching data
        // base url
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
        },
    }),
    // 4-create end points for api
    endpoints: (builder) => ({
        getSummary: builder.query({
            // encodeURIComponent() function encodes special characters that may be present in the parameter values
            // If we do not properly encode these characters, they can be misinterpreted by the server and cause errors or unexpected behavior. Thus that RTK bug
            query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
        }),
    }),
})

//5-export

export const { useLazyGetSummaryQuery } = articleApi