import {useCallback, useState} from "react";

const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const clearError = useCallback(() => setError(null), [])

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'Application/json'
            }
            const response = await fetch(url, {method, body, headers})
            const data = await response.json()
            if (!response.ok) {
                throw new Error('Что-то пошло не так(')
            }
            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    return {loading, request, error, clearError}
}
export default useHttp