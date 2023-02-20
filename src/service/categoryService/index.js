import { deleteRequest, get, post, put } from "../../utils/api";

export const getAllCategories = async (params) => {
  const categoriesResponse = await get("/api/categories", params);
  return categoriesResponse.data;
};

export const getCategoryById = async (id) => {
  const categoryResonse = await get(`/api/categories/${id}`);
  return categoryResonse.data;
};

export const addCategory = async (data) => {
  const categoryResonse = await post("/api/categories", data, true, {
    "Content-Type": `multipart/form-data`
  });
  return categoryResonse.data;
};

export const updateCategory = async (data, id) => {
  const categoryResonse = await put(`/api/categories/${id}`, data, true, {
    "Content-Type": `multipart/form-data`
  });
  return categoryResonse.data;
};

export const deleteCategory = async (id) => {
  const deleteResponse = await deleteRequest(`/api/categories/${id}`);
  return deleteResponse.data;
};