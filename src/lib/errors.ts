/**
 * Standardized API Error class with consistent structure
 * Makes it easy to understand and handle errors throughout the application
 */
export class ApiError extends Error {
  public readonly statusCode?: number
  public readonly code?: string
  public readonly originalMessage?: string
  public readonly userMessage: string
  public readonly details?: unknown

  constructor({
    message,
    statusCode,
    code,
    originalMessage,
    userMessage,
    details,
  }: {
    message: string
    statusCode?: number
    code?: string
    originalMessage?: string
    userMessage: string
    details?: unknown
  }) {
    super(message)
    this.name = "ApiError"
    this.statusCode = statusCode
    this.code = code
    this.originalMessage = originalMessage
    this.userMessage = userMessage
    this.details = details

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError)
    }
  }

  /**
   * Get a structured error object for easy inspection
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      userMessage: this.userMessage,
      statusCode: this.statusCode,
      code: this.code,
      originalMessage: this.originalMessage,
      details: this.details,
    }
  }
}

/**
 * Check if an error (or serialized error object) is an ApiError
 * Handles both ApiError instances and serialized ApiError objects from server actions
 */
export function isApiError(error: unknown): error is ApiError | ApiErrorShape {
  if (error instanceof ApiError) {
    return true
  }

  // Handle serialized ApiError from server actions
  if (
    typeof error === "object" &&
    error !== null &&
    "userMessage" in error &&
    typeof (error as { userMessage: unknown }).userMessage === "string"
  ) {
    return true
  }

  return false
}

/**
 * Shape of serialized ApiError (when sent from server actions)
 */
interface ApiErrorShape {
  name?: string
  message?: string
  userMessage: string
  statusCode?: number
  code?: string
  originalMessage?: string
  details?: unknown
}

/**
 * Extract user-friendly error message from any error type
 * Handles ApiError instances, serialized ApiErrors, and regular Errors
 */
export function getErrorMessage(error: unknown): string {
  // Handle ApiError instances
  if (error instanceof ApiError) {
    return error.userMessage
  }

  // Handle serialized ApiError from server actions (has userMessage property)
  if (isApiError(error)) {
    const apiError = error as ApiErrorShape
    return apiError.userMessage
  }

  // Extract message from Error objects or plain objects with message property
  let message: string | undefined

  if (error instanceof Error) {
    message = error.message
  } else if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  ) {
    // Handle serialized error objects from Next.js server actions
    message = (error as { message: string }).message
  } else {
    // Handle unknown error types
    message = String(error) || "Something unexpected happened"
  }

  // Check if the message contains context prefix like "[fetchFn(/waitlist)]"
  const contextMatch = message.match(/^\[.*?\]\s*(.+)$/)
  if (contextMatch) {
    const actualMessage = contextMatch[1].trim()
    // Try to get user-friendly message for the actual error
    return getUserFriendlyMessage(actualMessage)
  }

  return getUserFriendlyMessage(message)
}

/**
 * Maps backend error messages to user-friendly messages
 */
const ERROR_MESSAGE_MAP: Record<string, string> = {
  "An internal server error occurred":
    "We're experiencing some technical difficulties. Please try again in a few moments.",
  "Internal server error":
    "We're experiencing some technical difficulties. Please try again in a few moments.",
  "Internal Server Error":
    "We're experiencing some technical difficulties. Please try again in a few moments.",
  "Network error: Could not reach the server.":
    "Unable to connect to the server. Please check your internet connection and try again.",
  "Unknown error": "Something unexpected happened. Please try again.",
  timeout: "The request took too long to complete. Please try again.",
}

/**
 * Maps HTTP status codes to user-friendly messages
 */
const STATUS_CODE_MAP: Record<number, string> = {
  400: "The request was invalid. Please check your input and try again.",
  401: "You're not authorized to perform this action. Please log in and try again.",
  403: "You don't have permission to perform this action.",
  404: "The requested resource was not found.",
  409: "This action conflicts with existing data. Please check and try again.",
  422: "The information provided is invalid. Please check your input and try again.",
  429: "Too many requests. Please wait a moment and try again.",
  500: "We're experiencing some technical difficulties. Please try again in a few moments.",
  502: "The server is temporarily unavailable. Please try again later.",
  503: "The service is temporarily unavailable. Please try again later.",
  504: "The request took too long to complete. Please try again.",
}

/**
 * Get user-friendly error message
 */
export function getUserFriendlyMessage(
  originalMessage: string,
  statusCode?: number
): string {
  // Check for exact matches first
  const normalizedMessage = originalMessage.trim()
  if (ERROR_MESSAGE_MAP[normalizedMessage]) {
    return ERROR_MESSAGE_MAP[normalizedMessage]
  }

  // Check for partial matches (case-insensitive)
  const lowerMessage = normalizedMessage.toLowerCase()
  for (const [key, value] of Object.entries(ERROR_MESSAGE_MAP)) {
    if (lowerMessage.includes(key.toLowerCase())) {
      return value
    }
  }

  // Check status code mapping
  if (statusCode && STATUS_CODE_MAP[statusCode]) {
    return STATUS_CODE_MAP[statusCode]
  }

  // Default: return original message if no mapping found
  return originalMessage
}

/**
 * Create an ApiError from an Axios error or other error
 */
export function createApiError(error: unknown, context?: string): ApiError {
  // Handle Axios errors
  if (typeof error === "object" && error !== null && "isAxiosError" in error) {
    const axiosError = error as {
      response?: { status: number; data?: unknown; statusText?: string }
      request?: unknown
      message?: string
      code?: string
    }

    if (axiosError.response) {
      const statusCode = axiosError.response.status
      const responseData = axiosError.response.data

      // Extract error message from response
      const errorMessage =
        (typeof responseData === "object" &&
          responseData !== null &&
          ("message" in responseData
            ? String(responseData.message)
            : "error" in responseData
              ? String(responseData.error)
              : undefined)) ||
        axiosError.response.statusText ||
        axiosError.message ||
        "Unknown error occurred"

      const userMessage = getUserFriendlyMessage(errorMessage, statusCode)

      return new ApiError({
        message: context ? `[${context}] ${errorMessage}` : errorMessage,
        statusCode,
        originalMessage: errorMessage,
        userMessage,
        code: axiosError.code,
        details: responseData,
      })
    }

    if (axiosError.request) {
      const userMessage = getUserFriendlyMessage(
        "Network error: Could not reach the server."
      )
      return new ApiError({
        message: "Network error: Could not reach the server.",
        originalMessage: axiosError.message || "Network error",
        userMessage,
        code: axiosError.code || "NETWORK_ERROR",
        details: { request: axiosError.request },
      })
    }
  }

  // Handle regular Error objects
  if (error instanceof Error) {
    const userMessage = getUserFriendlyMessage(error.message)
    return new ApiError({
      message: context ? `[${context}] ${error.message}` : error.message,
      originalMessage: error.message,
      userMessage,
    })
  }

  // Handle unknown error types
  const errorMessage = String(error) || "An unexpected error occurred"
  const userMessage = getUserFriendlyMessage(errorMessage)
  return new ApiError({
    message: context ? `[${context}] ${errorMessage}` : errorMessage,
    originalMessage: errorMessage,
    userMessage,
    details: error,
  })
}
