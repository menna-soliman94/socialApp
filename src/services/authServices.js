import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL

export async function registerUser(formData) {
    const response = await axios.post(`${API_URL}/users/signup`, formData)
    return response.data

}
export async function loginUser(formData) {
    const response = await axios.post(`${API_URL}/users/signin`, formData)
    return response.data

}