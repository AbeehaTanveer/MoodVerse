import axios from 'axios';

const baseURL = "https://mood-verse-vcma.vercel.app/api";
const token = localStorage.getItem("token");

const api = axios.create({
  baseURL,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json"
  }
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Attaching token:", token); // <- add this
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const likeComment = async (commentId, userId) => {
  return await api.post(`/comments/like/${commentId}`, { userId }); // ✅ MATCHES BACKEND
};

export default api;
