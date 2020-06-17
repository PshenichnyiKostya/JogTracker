import {useCallback, useEffect, useState} from "react";

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    const login = useCallback((token, id) => {
        setToken(token)
        setUserId(id)
        localStorage.setItem('userData', JSON.stringify({
                userId: id, token: token
            }
        ))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem('userData')
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))
        if (data?.token) {
            login(data.token, data.userId)
        }
    }, [login])

    return {login, logout, userId, token}
}