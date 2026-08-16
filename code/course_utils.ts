import { Course, CountryCode } from "./course_types.ts"

/**
 * Formats course price based on detected country.
 * - "IN" -> INR (from pricePaise)
 * - "US" / fallback -> USD (from priceUsdCents)
 */
export function formatCoursePrice(
    course: Course,
    countryCode?: CountryCode
): string {
    const isIndia = countryCode?.toUpperCase() === "IN"

    if (isIndia) {
        const inrAmount = (course.pricePaise ?? 0) / 100
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(inrAmount)
    }

    // Default Fallback: USD
    const usdAmount = (course.priceUsdCents ?? 0) / 100
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(usdAmount)
}
