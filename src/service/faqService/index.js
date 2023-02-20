import { deleteRequest, get, post, put } from "../../utils/api";

export const getFaqs = async (params) => {
  const getResponse = await get("/api/faqs", params);
  return getResponse.data;
};

export const addFaq = async (data) => {
  const addResponse = await post("/api/faqs", data);
  return addResponse.data;
};

export const updateFaq = async (id, data) => {
  const updateResponse = await put(`/api/faqs/${id}`, data);
  return updateResponse.data;
};

export const setVisible = async (id, data) => {
  const updateResponse = await put(`/api/faqs/${id}/visible`, data);
  return updateResponse.data;
};

export const deleteFaq = async (id) => {
  const deleteResponse = await deleteRequest(`/api/faqs${id}`);
  return deleteResponse.data;
};