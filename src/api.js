import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // replace with your backend base URL
  headers: {
    "Content-Type": "application/json",
    "x-Client-Token": import.meta.env.VITE_CLIENT_SECRET_TOKEN
  },
});

export const getSubEvents = async (eventId, billingUserId) => {
  const res = await api.post(`/event/details/subevents`, { billingUserId, eventId });
  return res.data;
};

export default api;