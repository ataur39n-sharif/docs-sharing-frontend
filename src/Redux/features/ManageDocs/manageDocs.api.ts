import { ApiSlice } from "../../api/api.slice"




const DocsApiSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllDocs: builder.query({
            query: () => ({
                url: '/documents'
            })
        }),
        getSingleDoc: builder.query({
            query: (id: string) => ({
                url: `/documents/${id}`
            })
        }),
        addDocs: builder.mutation({
            query: (payload) => ({
                url: '/documents',
                method: 'POST',
                body: payload
            })
        }),
        editDocs: builder.mutation({
            query: (payload) => ({
                url: `/documents/${payload.id}`,
                method: 'PATCH',
                body: payload.data
            })
        }),
        deleteDocs: builder.mutation({
            query: (id: string) => ({
                url: `/documents/${id}`,
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