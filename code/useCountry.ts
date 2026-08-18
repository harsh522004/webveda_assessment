import { useState, useEffect, useCallback } from "react"
import { CountryCode, CountryApiResponse } from "./course_types.ts"

export function useCountry(countryApiUrl: string) {
    const [countryCode, setCountryCode] = useState<CountryCode>("US")
    const [countryError, setCountryError] = useState<boolean>(false)

    const fetchCountry = useCallback(async () => {
        setCountryError(false)

        try {
            const response = await fetch(countryApiUrl)

            if (!response.ok) {
                throw new Error(`Country API status: ${response.status}`)
            }

            const data: CountryApiResponse = await response.json()

            if (data?.country_code) {
                setCountryCode(data.country_code)
                setCountryError(false)
            } else {
                // Fall back to the default country when the response is incomplete.
                setCountryCode("US")
                setCountryError(true)
            }
        } catch (err) {
            setCountryCode("US")
            setCountryError(true)
        } finally {
            console.groupEnd()
        }
    }, [countryApiUrl])

    useEffect(() => {
        fetchCountry()
    }, [fetchCountry])

    return {
        countryCode,
        countryError,
        retryCountry: fetchCountry,
    }
}
