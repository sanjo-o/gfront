import axios from 'axios';

// Use same base everywhere
const API_BASE = "http://localhost:8000";

export const registerUser = async (formData) => {
    try {
        const res = await axios.post(`${API_BASE}/api/users`, {
            name: formData.username,
            email: formData.email,
            password: formData.password,
        });

        return res.data;
    } catch (err) {
        return {
            error: err.response?.data?.error || "Сервертэй холбогдоход алдаа гарлаа",
        };
    }
};

export const loginUser = async (formData) => {
    try {
        const res = await axios.post(`${API_BASE}/api/users/login`, {
            email: formData.email,
            password: formData.password,
        });
        return res.data;
    } catch (err) {
        return {
            error: err.response?.data?.error || 'Нэвтрэхэд алдаа гарлаа',
        };
    }
};