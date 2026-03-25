import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL



export async function getLoggedUserData(userId) {
    const token = localStorage.getItem("userToken")

    const response = await axios.get(`${API_URL}/users/${userId}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}