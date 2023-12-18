import { ApiSlice } from "../../api/api.slice"




const DocsApiSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllDocs: builder.query({
            query: () => ({
                url: '/docs'
            })
        }),
        getSingleDoc: builder.query({
            query: (id: string) => ({
                url: `/docs/${id}`
            })
        }),
        addDocs: builder.mutation({
            query: (payload) => ({
                url: '/docs',
                method: 'POST',
                body: payload
            })
        }),
        editDocs: builder.mutation({
            query: (payload) => ({
                url: `/docs/${payload.id}`,
                method: 'PATCH',
                body: payload.data
            })
        }),
        deleteDocs: builder.mutation({
            query: (id: string) => ({
                url: `/docs/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const {
    useGetAllDocsQuery,
    useGetSingleDocQuery,
    useAddDocsMutation,
    useEditDocsMutation,
    useDeleteDocsMutation
} = DocsApiSlice