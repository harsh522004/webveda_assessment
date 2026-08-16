Skillpath - Learning Platform Landing Page
===========================================

Skillpath is a learning platform landing page built in Framer.

**[🌐 View Live Website](https://learn-skillpath.framer.website/)**

The main focus of the project is the **Courses section**, which fetches live course data from the provided API and dynamically displays courses based on the user's detected country.

Tech Stack
----------

-   **Framer** --- Website builder and Code Component environment

-   **React** --- Used to build the dynamic Courses section

-   **TypeScript** --- Used for types, interfaces, and safer code

-   **CSS** --- Responsive layout and component styling

-   **REST API** --- Live course and country data

Features
--------

-   Live course data fetched from the provided API

-   Dynamic course count

-   Country-based currency display

    -   India → INR

    -   US / fallback → USD

-   Loading state

-   Error state with retry

-   Empty state

-   Country detection failure handling with USD fallback

-   Responsive course grid

    -   3 columns on desktop

    -   2 columns on tablet

    -   1 column on mobile

-   Two Framer property controls:

    -   Course section title

    -   Card gap

-   Two-line course description truncation

-   Course category and course type information

-   Refundable badge when applicable

Project Structure
-----------------

```
Skillpath/
│
├── CourseList.tsx
│   └── Main Framer Code Component.
│       Handles the course section, UI states,
│       responsive grid, and property controls.
│
├── CourseCard.tsx
│   └── Responsible for rendering an individual course.
│
├── useCourses.ts
│   └── Custom hook for fetching and managing
│       course API data and its states.
│
├── useCountry.ts
│   └── Custom hook for detecting the country
│       and handling country API failures.
│
├── course_types.ts
│   └── TypeScript interfaces and types used
│       across the project.
│
├── course_utils.ts
│   └── Contains the course price formatting logic.
│
├── theme.ts
│   └── Shared colors, typography, spacing,
│       and border-radius values.
│
└── ai_conversation/
    └── Contains the AI conversations used during
        the development and learning process.

```

The code is separated into components, hooks, types, utilities, and theme configuration so that each part has a clear responsibility.

How It Works
------------

The `CourseList` component uses two custom hooks:

```
CourseList
    │
    ├── useCourses()
    │       └── Course API
    │
    └── useCountry()
            └── Country API

```

The course API provides the course data, while the country API determines which price should be displayed.

The course data is then passed to `CourseCard`, where the course information and formatted price are rendered.

If the country API fails, the application falls back to USD rather than blocking the course section.

UI States
---------

The Courses section handles four main states:

1.  **Loading** --- while course data is being fetched

2.  **Error** --- when the course request fails

3.  **Empty** --- when the API returns no courses

4.  **Success** --- when courses are available

The country API is handled independently. If it fails while the course API succeeds, the courses are still displayed using USD as the fallback currency.

Price Formatting
----------------

The API provides prices in the smallest currency units:

-   `pricePaise` → converted to INR by dividing by 100

-   `priceUsdCents` → converted to USD by dividing by 100

`Intl.NumberFormat` is used to format the final currency value correctly for each locale.

Resources
---------

### Build with AI

- [AI-Assisted Development](ai_conversation/BUILD-WITH-AI.md) - Development process, learning journey, and AI collaboration insights