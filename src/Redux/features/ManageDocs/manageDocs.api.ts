import { ApiSlice } from "../../api/api.slice"
import { IDocs } from "./manageDocs.slice"



const DocsApiSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllDocs: builder.query({
            query: () => ({
                url: '/documents'
            }),
            providesTags: ['docs']
        }),
        getSingleDoc: builder.query({
            query: (id: string) => ({
                url: `/documents/${id}`
            })
        }),
        addDocs: builder.mutation({
            query: (payload: IDocs) => ({
                url: '/documents',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['docs']
        }),
        editDocs: builder.mutation({
            query: (payload:{
                id:string,
                data:Partial<IDocs>
            }) => ({
                url: `/documents/${payload.id}`,
                method: 'PATCH',
                body: payload.data
            }),
            invalidatesTags: ['docs']
        }),
        deleteDocs: builder.mutation({
            query: (id: string) => ({
                url: `/documents/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['docs']
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