import { deleteRequest, get, post } from "../../utils/api";

export const getTags = async () => {
  const tagsResponse = await get("/api/tags");
  return tagsResponse.data;
};

export const addTag = async (data) => {
  const tagResponse = await post("/api/tags", data);
  return tagResponse.data;
};

export const deleteTag = async (id) => {
  const deleteResponse = await deleteRequest(`/api/tags/${id}`);
  return deleteResponse.data;
};