import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/notes";

export const createNote = async ({ type, refDate, content }) => {
    try {
        const response = await axios.post(API_BASE_URL, {
            type,
            refDate,
            content,
        });
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.error || "Failed to create note" };
    }
};

export const getNotesByTypeAndDate = async (type, refDate) => {
    try {
        const response = await axios.get(API_BASE_URL, {
            params: { type, refDate },
        });
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.error || "Failed to fetch notes" };
    }
};

export const getNoteById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.error || "Note not found" };
    }
};

export const deleteNoteById = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.error || "Failed to delete note" };
    }
};

export const fetchNotes = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/daily`)
        return response.data;
    } catch (err) {
        console.error("❌ Failed to fetch notes:", err.response?.data || err.message);
        throw err;
    }
};

export const updateNote = async (id, data) => {
    const res = await axios.put(`${API_BASE_URL}/${id}`, data);
    return res.data;
};