import { useState, useEffect } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:9009/acme/auth'

export function useAuth(redirect) {
    const [auth, setAuth] = useState(null)
    const getToken = () => localStorage.getItem('token')
    async function checkAuth() {
        try {
            await axios.get(
                `${BASE_URL}/is_authed`,
                { headers: { Authorization: getToken() } },
            )
            setAuth(true)
        } catch (err) {
            localStorage.removeItem('token')
            setAuth(false)
        }
    }
    useEffect(() => {
        if (!localStorage.getItem('token')) redirect()
        else checkAuth()
    }, [])
    useEffect(() => {
        if (auth === false) redirect()
    }, [auth])
    return { auth, checkAuth }
}

export function useInput(name, initialValue = '') {
    const [value, setValue] = useState(initialValue)
    const onChange = e => setValue(e.target.value)
    return { value, onChange, name }
}
