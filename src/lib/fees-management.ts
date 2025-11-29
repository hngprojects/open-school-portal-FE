import { apiFetch } from "./api/client"

// ----------------------
// Types
// ----------------------
export type CreateFeeComponentData = {
  component_name: string
  description?: string
  amount: number
  term_id: string
  class_ids: string[]
}

export type UpdateFeeComponentData = Partial<CreateFeeComponentData>

export interface FeeComponent {
  id: string
  component_name: string
  description: string
  amount: number
  term: {
    id: string
    name: string
    startDate?: string
    endDate?: string
  }
  classes: { id: string; name?: string }[] | null
  status: string
  created_by: string
  created_at: string
  updated_at: string
}

// This matches your ACTUAL API response structure
interface FeeListData {
  fees: FeeComponent[] | null
  total: number
  page: number
  limit: number
  totalPages: number
}

interface FeePaginationResponse {
  status_code: number
  message: string
  data: FeeListData
}

interface ResponsePack<T> {
  status_code: number
  message: string
  data: T
}

// ----------------------
// API WRAPPER
// ----------------------
export const FeesAPI = {
  // Get all fee components
  getAll: (params?: { page?: number; limit?: number }) =>
    apiFetch<FeePaginationResponse>("/fees", { params }, true),

  // Get one fee component
  getOne: (id: string) =>
    apiFetch<ResponsePack<FeeComponent>>(`/fees/${id}`, undefined, true),

  // Create fee component
  create: (body: CreateFeeComponentData) =>
    apiFetch<ResponsePack<FeeComponent>>(
      "/fees",
      {
        method: "POST",
        data: body,
      },
      true
    ),

  // Update fee component
  update: (id: string, body: UpdateFeeComponentData) =>
    apiFetch<ResponsePack<FeeComponent>>(
      `/fees/${id}`,
      {
        method: "PATCH",
        data: body,
      },
      true
    ),

  // Delete fee component
  delete: (id: string) =>
    apiFetch(
      `/fees/${id}`,
      {
        method: "DELETE",
      },
      true
    ),
}
// import { apiFetch } from "./api/client"

// // ----------------------
// // Types
// // ----------------------
// export type CreateFeeComponentData = {
//   component_name: string
//   description?: string
//   amount: number
//   term_id: string
//   class_ids: string[]
// }

// export type UpdateFeeComponentData = Partial<CreateFeeComponentData>

// export interface FeeComponent {
//   id: string
//   component_name: string
//   description: string
//   amount: number
//   term: {
//     id: string
//     name: string
//     startDate?: string
//     endDate?: string
//   }
//   classes: { id: string; name?: string }[] | null
//   status: string
//   created_by: string
//   created_at: string
//   updated_at: string
// }

// interface FeePaginationResponse {
//   message: string
//   fees: FeeComponent[] | null
//   total: number
//   page: number
//   limit: number
//   totalPages: number
// }

// interface ResponsePack<T> {
//   message: string
//   data: T
// }

// // ----------------------
// // API WRAPPER
// // ----------------------
// export const FeesAPI = {
//   // Get all fee components
//   getAll: (params?: { page?: number; limit?: number }) =>
//     apiFetch<FeePaginationResponse>("/fees", { params }, true),

//   // Get one fee component
//   getOne: (id: string) =>
//     apiFetch<ResponsePack<FeeComponent>>(`/fees/${id}`, undefined, true),

//   // Create fee component
//   create: (body: CreateFeeComponentData) =>
//     apiFetch<ResponsePack<FeeComponent>>(
//       "/fees",
//       {
//         method: "POST",
//         data: body,
//       },
//       true
//     ),

//   // Update fee component
//   update: (id: string, body: UpdateFeeComponentData) =>
//     apiFetch<ResponsePack<FeeComponent>>(
//       `/fees/${id}`,
//       {
//         method: "PATCH",
//         data: body,
//       },
//       true
//     ),

//   // Delete fee component
//   delete: (id: string) =>
//     apiFetch(
//       `/fees/${id}`,
//       {
//         method: "DELETE",
//       },
//       true
//     ),
// }

// // import { apiFetch } from "./api/client"

// // export type FeeManagement = {
// //   component_name: string
// //   description: string
// //   amount: number
// //   term_id: string
// //   class_ids: string[]
// // }

// // export interface GetFeesParams {
// //   is_active?: boolean
// //   page?: number
// //   search?: string
// //   limit?: number
// //   total?: number
// // }

// // export const FeeManagementAPI = {
// //   //   getAll: (params?: GetFeesParams) =>
// //   //     apiFetch<ResponsePack<ResponsePack<User[]>>>(
// //   //       "/fees",
// //   //       {
// //   //         params,
// //   //       },
// //   //       true
// //   //     ),
// //   create: (data: FeeManagement) => apiFetch,
// // }
