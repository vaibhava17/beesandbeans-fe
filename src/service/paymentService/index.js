import { get, post, put } from "../../utils/api";

export const createOrder = async (data) => {
  const orderResponse = await post("/api/order", data);
  return orderResponse.data;
};

export const paymentComplition = async (data) => {
  const paymentResponse = await post("/api/order/payment", data);
  return paymentResponse;
}

export const getOrderList = async () => {
  const ordersResponse = await get("/api/order");
  return ordersResponse.data;
}

export const cancelOrder = async (data) => {
  const cancelResponse = await put("/api/order", data);
  return cancelResponse;
}