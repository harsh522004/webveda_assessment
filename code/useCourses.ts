import { useState, useEffect, useCallback } from "react"
import { Course, FetchError } from "./course_types.ts"

export function useCourses(apiUrl: string) {
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<FetchError | null>(null)

    const fetchCourses = useCallback(async () => {
        if (!apiUrl || apiUrl.trim() === "") {
            setCourses([])
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await fetch(apiUrl)

            if (!response.ok) {
                if (response.status === 404) {
                    setError({
                        status: 404,
                        title: "Courses Not Found",
                        message:
                            "We couldn’t find the courses you are looking for.",
                    })
                } else if (response.status >= 500) {
                    setError({
                        status: 500,
                        title: "Server Error",
                        message:
                            "Our servers are experiencing an issue. Please try again shortly.",
                    })
                } else {
                    setError({
                        status: response.status,
                        title: "Unable to Load Courses",
                        message:
                            "An unexpected error occurred while fetching course data.",
                    })
                }
                return
            }

            const data = await response.json()

            if (!Array.isArray(data)) {
                throw new Error("Invalid course data received")
            }

            setCourses(data)
        } catch {
            setError({
        title: "Unable to Load Courses",
        message: "We couldn't load the courses. Please try again.",
    })
            
        } finally {
            setLoading(false)
        }
    }, [apiUrl])

    useEffect(() => {
        fetchCourses()
    }, [fetchCourses])

    return { courses, loading, error, refetch: fetchCourses }
}
