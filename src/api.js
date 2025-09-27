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

export const getGlobalPasses = async (billingUserId, eventId) => {
  const res = await api.post('/event/details/global', { billingUserId, eventId });
  return res.data;
}

export const createPassOrder = async (data) => {
  const res = await api.post('/billingUser/order/create', data);
  return res.data;
}

export const createGlobalPassOrder = async (data) => {
  const res = await api.post('/billingUser/order/global/create', data);
  return res.data;
}

export const verifyTransaction = async (transactionId) => {
  const res = await api.get(`/payment/status?transactionId=${transactionId}`);
  return res.data;
}

export const createSinglePasses = async (order_id) => {
  const res = await api.post('/billingUser/issue-passes', { order_id });
  return res.data;
}

export const createGlobalPasses = async (order_id) => {
  const res = await api.post('/billingUser/issue-global-passes', { order_id });
  return res.data;
}

export default api;