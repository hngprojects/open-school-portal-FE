import { apiFetch } from "@/lib/api/client"

export interface Notification {
  id: string
  recipient_id: string
  type: string
  title: string
  message: string
  is_read: boolean
  metadata: Record<string, unknown>
  action_url?: string
  created_at: string
  updated_at: string
}

export interface NotificationsPagination {
  total: number
  page: number
  limit: number
  total_pages: number
  has_next: boolean
  has_previous: boolean
}

export interface GetNotificationsResponse {
  message: string
  data: {
    notifications: Notification[]
  }
  pagination: NotificationsPagination
}

export interface GetNotificationsParams {
  page?: number
  read?: boolean
}

export const NotificationsAPI = {
  getUserNotifications: (params?: GetNotificationsParams) =>
    apiFetch<GetNotificationsResponse>(
      "/notifications/user",
      {
        method: "GET",
        params,
      },
      true
    ),
}
// import { apiFetch } from "@/lib/api/client"

// export interface Notification {
//   id: string
//   recipient_id: string
//   type: string
//   title: string
//   message: string
//   is_read: boolean
//   metadata: Record<string, any>
//   action_url?: string
//   created_at: string
//   updated_at: string
// }

// export interface NotificationsPagination {
//   total: number
//   page: number
//   limit: number
//   total_pages: number
//   has_next: boolean
//   has_previous: boolean
// }

// export interface GetNotificationsResponse {
//   message: string
//   data: {
//     notifications: Notification[]
//   }
//   pagination: NotificationsPagination
// }

// export interface GetNotificationsParams {
//   page?: number
//   read?: boolean
// }

// export const NotificationsAPI = {
//   getUserNotifications: (params?: GetNotificationsParams) =>
//     apiFetch<GetNotificationsResponse>(
//       "/notifications/user",
//       {
//         method: "GET",
//         params,
//       },
//       true
//     ),
// }
