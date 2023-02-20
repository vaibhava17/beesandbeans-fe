import { deleteRequest, get, post, put } from "../../utils/api";

export const getCartItems = async () => {
  const cartResponse = await get("/api/cart");
  return cartResponse.data;
};

export const addToCart = async (data) => {
  const cartResponse = await post("/api/cart", data);
  return cartResponse.data;
};

export const updateCartItem = async (data, id) => {
  const cartResponse = await put(`/api/cart/${id}`, data);
  return cartResponse.data;
};

export const removeFromCart = async (id) => {
  const deleteResponse = await deleteRequest(`/api/cart/${id}`);
  return deleteResponse.data;
};
