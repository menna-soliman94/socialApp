import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL

export async function getAllPosts() {
    const token = localStorage.getItem("userToken")

    const response = await axios.get(`${API_URL}/posts`, {
        // params: {
        //     limit: 50,
        //     sort: "-createdAt"
        // }
        // ,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export async function getPostDetails(postId) {
    const token = localStorage.getItem("userToken")

    const response = await axios.get(`${API_URL}/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}
export async function createPost(formData) {
    const token = localStorage.getItem("userToken")

    const response = await axios.post(`${API_URL}/posts`, formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export async function updatePost(formData, postId) {
    const token = localStorage.getItem("userToken")

    const response = await axios.put(`${API_URL}/posts/${postId}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}