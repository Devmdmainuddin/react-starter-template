import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}` }),
    tagTypes: ['reviews'],
    endpoints: (builder) => ({
        // get reviews
        getReviews: builder.query({
            query: (id) => `/reviews/${id}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'reviews', id })),
                        { type: 'reviews', id: 'LIST' }, // Track the list
                    ]
                    : [{ type: 'reviews', id: 'LIST' }],
        }),
        // delete reviews
        deleteReviews: builder.mutation({
            query: (id) => ({
                url: `/reviews/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'reviews', id },
                { type: 'reviews', id: 'LIST' },
            ],
        }),
        // add Reviews
        addReviews: builder.mutation({
            query: (body) => ({
                url: `/reviews`,
                method: 'POST',
                body
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'reviews', id },
                { type: 'reviews', id: 'LIST' }
            ],
        }),
    }),
});

export const { useGetReviewsQuery, useDeleteReviewsMutation, useAddReviewsMutation } = reviewsApi;
