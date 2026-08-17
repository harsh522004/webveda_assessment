import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { CourseCard } from "./CourseCard.tsx"
import { useCourses } from "./useCourses.ts"
import { useCountry } from "./useCountry.ts"
import { CourseListProps } from "./course_types.ts"
import { theme } from "./theme.ts"

// API endpoints as internal constants
const API_URL = "https://syncsphere-hiv6.onrender.com/assignment/course-data"
const COUNTRY_API_URL =
    "https://syncsphere-hiv6.onrender.com/assignment/country-code"

export default function CourseList({
    apiUrl,
    countryApiUrl,
    title = "Explore our courses",
    gridGap = 24,
}: CourseListProps) {
    const { courses, loading, error, refetch } = useCourses(API_URL)
    const { countryCode, countryError, retryCountry } =
        useCountry(COUNTRY_API_URL)

    // 1. Loading State
    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "60vh",
                    gap: theme.spacing.md,
                    padding: `${theme.spacing.xl * 1.5}px ${theme.spacing.lg}px`,
                    width: "100%",
                    fontFamily: theme.typography.fontFamily,
                    color: theme.colors.textSecondary,
                }}
            >
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
                <div
                    style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: theme.radius.pill,
                        border: `3px solid ${theme.colors.border}`,
                        borderTopColor: theme.colors.text,
                        animation: "spin 0.8s linear infinite",
                    }}
                />
                <span style={{ fontSize: theme.typography.body }}>
                    Loading courses...
                </span>
            </div>
        )
    }

    // 2. Error State
    if (error) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: `${theme.spacing.xl * 1.5}px ${theme.spacing.lg}px`,
                    margin: "20px auto",
                    maxWidth: "420px",
                    borderRadius: theme.radius.lg,
                    backgroundColor: theme.colors.surface,
                    border: `1px solid ${theme.colors.border}`,
                    fontFamily: theme.typography.fontFamily,
                    color: theme.colors.text,
                }}
            >
                <div
                    style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: theme.radius.pill,
                        backgroundColor:
                            error.status === 404
                                ? theme.colors.background
                                : "#fee2e2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        marginBottom: theme.spacing.md,
                    }}
                >
                    {error.status === 404 ? "🔍" : "⚠️"}
                </div>
                <h3
                    style={{
                        fontSize: "18px",
                        fontWeight: 600,
                        margin: `0 0 ${theme.spacing.sm}px 0`,
                    }}
                >
                    {error.title}
                </h3>
                <p
                    style={{
                        fontSize: theme.typography.body,
                        lineHeight: 1.5,
                        color: theme.colors.textSecondary,
                        margin: `0 0 ${theme.spacing.md}px 0`,
                    }}
                >
                    {error.message}
                </p>
                {error.status !== 404 && (
                    <button
                        onClick={() => refetch()}
                        style={{
                            padding: "9px 20px",
                            backgroundColor: theme.colors.primary,
                            color: theme.colors.surface,
                            fontSize: "13px",
                            fontWeight: 500,
                            borderRadius: theme.radius.sm,
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        Try Again
                    </button>
                )}
            </div>
        )
    }

    // 3. Empty State
    if (courses.length === 0) {
        return (
            <div
                style={{
                    color: theme.colors.textSecondary,
                    padding: theme.spacing.xl,
                    textAlign: "center",
                    fontFamily: theme.typography.fontFamily,
                    fontSize: theme.typography.body,
                }}
            >
                No courses available at this time.
            </div>
        )
    }

    // 4. Success State
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: theme.spacing.md,
            }}
        >
            <style>{`
                .course-list-shell {
                    width: 100%;
                    max-width: 1320px;
                    margin: 0 auto;
                    padding: 0 ${theme.spacing.xl}px 40px;
                    box-sizing: border-box;
                }

                .course-grid {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: ${theme.spacing.lg}px;
                    width: 100%;
                }

                @media (max-width: 900px) {
                    .course-list-shell {
                        padding: 0 ${theme.spacing.lg}px ${theme.spacing.xl}px;
                    }

                    .course-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                        gap: ${theme.spacing.md}px;
                    }
                }

                @media (max-width: 600px) {
                    .course-list-shell {
                        padding: 0 ${theme.spacing.md}px ${theme.spacing.lg}px;
                    }

                    .course-grid {
                        grid-template-columns: 1fr;
                        gap: 12px;
                    }
                }
            `}</style>

            {countryError && (
                <div
                    style={{
                        margin: `0 0 ${theme.spacing.lg}px 0`, // Removed side margins (0px left/right), added bottom spacing
                        boxSizing: "border-box",
                        width: "100%",
                        padding: "12px 16px",
                        backgroundColor: "#fffbeb",
                        border: `1px solid #fef3c7`,
                        borderRadius: theme.radius.sm,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "13px",
                        color: theme.colors.warning,
                        fontFamily: theme.typography.fontFamily,
                    }}
                >
                    <span>
                        ⚠️ Unable to detect your region. Showing prices in USD.
                    </span>
                    <button
                        onClick={() => retryCountry()}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: theme.colors.warning,
                            fontWeight: 600,
                            cursor: "pointer",
                            textDecoration: "underline",
                            padding: "0 4px",
                            fontSize: "13px",
                        }}
                    >
                        Retry
                    </button>
                </div>
            )}
            {/* Section Title */}
            {title && (
                <h2
                    style={{
                        fontSize: "24px",
                        fontWeight: 700,
                        color: theme.colors.text,
                        margin: `0 0 ${theme.spacing.lg}px 0`,
                        textAlign: "left",
                        fontFamily: theme.typography.fontFamily,
                    }}
                >
                    {title}
                </h2>
            )}

            {/* Grid with Dynamic Gap */}
            <div className="course-grid" style={{ gap: `${gridGap}px` }}>
                {courses.map((item, index) => (
                    <CourseCard
                        key={
                            item?.mangoId ??
                            item?.courseCode ??
                            `course-${index}`
                        }
                        course={item}
                        countryCode={countryCode}
                    />
                ))}
            </div>
        </div>
        </div >
    )
}

CourseList.defaultProps = {
    title: "Explore our courses",
    gridGap: 24,
}

addPropertyControls(CourseList, {
    title: {
        type: ControlType.String,
        title: "Title",
        defaultValue: "Explore our courses",
    },
    gridGap: {
        type: ControlType.Number,
        title: "Card Gap",
        min: 8,
        max: 64,
        step: 4,
        unit: "px",
        defaultValue: 24,
    },
})
