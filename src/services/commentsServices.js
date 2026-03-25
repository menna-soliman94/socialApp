import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL

export async function createComment(postId, comment) {
    const token = localStorage.getItem("userToken")
    const formData = new FormData();
    formData.append("content", comment.content);
    if (comment.image) {
        formData.append("image", comment.image);
    }


    const response = await axios.post(`${API_URL}/posts/${postId}/comments`, formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data.data
}

export async function getPostComments(postId) {
    const token = localStorage.getItem("userToken")
    const response = await axios.get(`${API_URL}/posts/${postId}/comments`, {
        params: {
            page: 1,
            limit: 10,
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data.comments;
}