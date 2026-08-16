import * as React from "react"
import { Course, CountryCode } from "./course_types.ts"
import { formatCoursePrice } from "./course_utils.ts"
import { theme } from "./theme.ts"

interface CourseCardProps {
    course: Course
    countryCode?: CountryCode
}

export function CourseCard({ course, countryCode }: CourseCardProps) {
    const formattedPrice = formatCoursePrice(course, countryCode)

    return (
        <>
            <style>{`
                .course-card {
                    min-width: 0;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    background-color: ${theme.colors.surface};
                    border: 1px solid ${theme.colors.border};
                    border-radius: ${theme.radius.md}px;
                    padding: ${theme.spacing.lg}px;
                    gap: 14px;
                    color: ${theme.colors.text};
                    font-family: ${theme.typography.fontFamily};
                    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
                }

                .course-card:hover {
                    border-color: ${theme.colors.primary};
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
                    transform: translateY(-2px);
                }

                @media (max-width: 600px) {
                    .course-card {
                        padding: ${theme.spacing.md}px !important;
                        gap: 10px !important;
                        border-radius: 10px !important;
                    }

                    .course-card-title {
                        font-size: 17px !important;
                    }

                    .course-card-description {
                        font-size: 13px !important;
                        height: 38px !important;
                    }

                    .course-card-price {
                        font-size: 19px !important;
                        margin-top: 6px !important;
                    }
                }
            `}</style>

            <div className="course-card">
                {/* Header: Category & Badge */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <span
                        style={{
                            fontSize: theme.typography.small,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            color: theme.colors.textSecondary,
                        }}
                    >
                        {course.mainCategory || "General"}
                    </span>

                    {course.courseType && (
                        <span
                            style={{
                                fontSize: "11px",
                                fontWeight: 500,
                                backgroundColor: theme.colors.background,
                                border: `1px solid ${theme.colors.border}`,
                                padding: "2px 8px",
                                borderRadius: theme.radius.pill,
                                color: theme.colors.textSecondary,
                            }}
                        >
                            {course.courseType}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3
                    className="course-card-title"
                    style={{
                        fontSize: theme.typography.title,
                        fontWeight: 700,
                        margin: 0,
                        lineHeight: 1.25,
                        color: theme.colors.text,
                    }}
                >
                    {course.courseName || "Untitled Course"}
                </h3>

                {/* Description (Clamped) */}
                <p
                    className="course-card-description"
                    style={{
                        fontSize: theme.typography.body,
                        lineHeight: 1.5,
                        height: "42px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        margin: 0,
                        color: theme.colors.textSecondary,
                    }}
                >
                    {course?.description || "No description provided."}
                </p>
                {/* Footer: Price & Refundable Badge */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: `${theme.spacing.sm + 4}px`,
                    }}
                >
                    {/* Left: Dynamic Price */}
                    <div
                        className="course-card-price"
                        style={{
                            fontSize: theme.typography.price,
                            fontWeight: 700,
                            color: theme.colors.primary,
                            margin: 0,
                        }}
                    >
                        {formattedPrice}
                    </div>

                    {/* Right: Light Green Badge */}
                    {course.refundable && (
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                padding: "4px 9px",
                                borderRadius: theme.radius.pill,
                                backgroundColor: theme.colors.badgeSuccessBg,
                                border: `1px solid ${theme.colors.badgeSuccessBorder}`,
                                color: theme.colors.badgeSuccessText,
                                fontSize: "12px",
                                fontWeight: 600,
                                letterSpacing: "0.01em",
                            }}
                        >
                            <span
                                style={{ fontSize: "11px", fontWeight: "bold" }}
                            >
                                ✓
                            </span>
                            <span>Refundable</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
