import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://docs-sharing-api.trelyt.store/api/v1',
    }),
    tagTypes: ['docs'],
    endpoints: () => ({})
})