export const config = (token) => { 
    return { 
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}`, }, 
    }
}
