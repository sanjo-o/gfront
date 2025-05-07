import axios from "axios";

const API_BASE = "http://localhost:8000";

export const saveUserInfo = async (data, id = null) => {
    try {
        if (id) {
            const res = await axios.put(`${API_BASE}/api/userinfo/${id}`, data);
            return res.data;
        } else {
            const res = await axios.post(`${API_BASE}/api/userinfo`, data);
            return res.data;
        }
    } catch (err) {
        return { error: err.response?.data?.error || "Алдаа гарлаа" };
    }
};

export const fetchUserInfoById = async (id) => {
    try {
        const res = await axios.get(`http://localhost:8000/api/userinfo/by-user/${id}`);
        return res.data;
    } catch (err) {
        return { error: err.response?.data?.error || "Хэрэглэгчийн мэдээлэл олдсонгүй" };
    }
};