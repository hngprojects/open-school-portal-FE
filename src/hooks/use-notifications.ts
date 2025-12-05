"use client"
import { useInfiniteQuery } from "@tanstack/react-query"
import { NotificationsAPI, GetNotificationsResponse } from "@/lib/notifications"

export const useNotifications = () => {
  return useInfiniteQuery<GetNotificationsResponse, Error>({
    queryKey: ["notifications"],
    queryFn: async ({ pageParam }) => {
      return NotificationsAPI.getUserNotifications({ page: pageParam as number })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.has_next ? lastPage.pagination.page + 1 : undefined
    },
    staleTime: 1000 * 60,
  })
}
// "use client"

// import { useInfiniteQuery } from "@tanstack/react-query"
// import { NotificationsAPI, GetNotificationsResponse } from "@/lib/notifications"

// // Type for query function input
// interface QueryFnProps {
//   pageParam?: number
// }

// export const useNotifications = () => {
//   return useInfiniteQuery<
//     GetNotificationsResponse,
//     Error,
//     GetNotificationsResponse,
//     ["notifications"]
//   >(
//     ["notifications"],
//     async ({ pageParam = 1 }: QueryFnProps) => {
//       return NotificationsAPI.getUserNotifications({ page: pageParam })
//     },
//     {
//       getNextPageParam: (lastPage) => {
//         return lastPage.pagination.has_next ? lastPage.pagination.page + 1 : undefined
//       },
//       staleTime: 1000 * 60,
//     }
//   )
// }

// // "use client"

// // import { useInfiniteQuery } from "@tanstack/react-query"
// // import { NotificationsAPI, GetNotificationsResponse } from "@/lib/notifications"

// // export const useNotifications = () => {
// //   return useInfiniteQuery<GetNotificationsResponse, Error>(
// //     ["notifications"],
// //     async ({ pageParam = 1 }): Promise<GetNotificationsResponse> => {
// //       const res = await NotificationsAPI.getUserNotifications({ page: pageParam })
// //       return res
// //     },
// //     {
// //       getNextPageParam: (lastPage: GetNotificationsResponse) => {
// //         // lastPage now has proper type
// //         return lastPage.pagination.has_next ? lastPage.pagination.page + 1 : undefined
// //       },
// //       staleTime: 1000 * 60, // 1 minute
// //     }
// //   )
// // }

// // // "use client"

// // // import { useInfiniteQuery } from "@tanstack/react-query"
// // // import { NotificationsAPI, Notification } from "@/lib/notifications"

// // // export const useNotifications = () => {
// // //   return useInfiniteQuery(
// // //     ["notifications"],
// // //     async ({ pageParam = 1 }) => {
// // //       const res = await NotificationsAPI.getUserNotifications({ page: pageParam })
// // //       return res
// // //     },
// // //     {
// // //       getNextPageParam: (lastPage) => {
// // //         if (lastPage.pagination.has_next) {
// // //           return lastPage.pagination.page + 1
// // //         }
// // //         return undefined
// // //       },
// // //       staleTime: 1000 * 60, // 1 minute
// // //     }
// // //   )
// // // }
