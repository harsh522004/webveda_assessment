export interface Course {
    courseName: string
    courseCode: string
    description: string
    mainCategory: string
    shortCourse?: string
    courseType?: string
    pricePaise: number
    priceUsdCents?: number
    mangoId?: string
    refundable: boolean
}

export type CountryCode = "IN" | "US" | string

export interface CountryApiResponse {
    country_code?: CountryCode
    detail?: string
    title?: string
    gridGap?: number
}

export interface CourseListProps {
    title?: string
    gridGap?: number
}

export interface FetchError {
    status?: number
    title: string
    message: string
}
