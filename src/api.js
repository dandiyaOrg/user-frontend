import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // replace with your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const getSubEvents = async (eventId, billingUserId) => {
  console.log('id', eventId, 'f4749ceb-7465-434e-9f83-9ac610bce09a')
  const res = await api.post(`/event/details/subevents`, { billingUserId: 'f4749ceb-7465-434e-9f83-9ac610bce09a', eventId });
  return res.data; // { statusCode, data, message, success }
};

export default api;