// A reusable fetch function, instead of repeating fetch logic in every queryFn

export async function fetchFn<T>(
  endpoint: string,
  options?: RequestInit // optional parameter you can pass to fetch for all the configuration options fetch accepts
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const url = `${baseUrl}${endpoint}`

  try {
    const response: Response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // unwrap and parse JSON body
    const data: T = await response.json()
    return data
  } catch (error) {
    throw error // throw so React Query knows it failed
  }
}
