import { deleteRequest, get, post, put } from "../../utils/api";

export const getProducts = async (params) => {
  const productsResponse = await get("/api/products", params);
  return productsResponse.data;
};

export const getProductLists = async () => {
  const productsResponse = await get("/api/products/lists");
  return productsResponse.data;
};

export const likeProduct = async (id) => {
  const likeResponse = await put(`/api/products/like/${id}`);
  return likeResponse.data;
};

export const addProduct = async (data) => {
  const productResponse = await post("/api/products/admin", data, true, {
    "Content-Type": `multipart/form-data`
  });
  return productResponse.data;
};

export const updateProduct = async (data, id) => {
  const productResponse = await put(`/api/products/admin/${id}`, data, true, {
    "Content-Type": `multipart/form-data`
  });
  return productResponse.data;
};

export const deleteProduct = async (id) => {
  const deleteResponse = await deleteRequest(`/api/products/admin/${id}`);
  return deleteResponse.data;
};

export const setOnFeed = async (id) => {
  const feedResponse = await put(`/api/products/admin/feed/${id}`);
  return feedResponse.data;
};

export const setInStock = async (id) => {
  const stockResponse = await put(`/api/products/admin/stock/${id}`);
  return stockResponse.data;
};

export const getProductsStats = async () => {
  const statsResponse = await get("/api/products/admin/stats");
  return statsResponse.data;
};

export const getProductById = async (id) => {
  const productResponse = await get(`/api/products/${id}`);
  return productResponse.data;
};
