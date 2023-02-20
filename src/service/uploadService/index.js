import { deleteRequest, post } from "../../utils/api";

export const uploadImage = async (data) => {
  const uploadResponse = await post("/api/uploads", data, true, {
      "Content-Type": `multipart/form-data`
  });
  return uploadResponse.data;
};

export const uploadImages = async (data) => {
  const uploadResponse = await post("/api/uploads/multi", data, true, {
      "Content-Type": `multipart/form-data`
  });
  return uploadResponse.data;
};

export const deleteImage = async (data) => {
  const deleteResponse = await deleteRequest(`/api/uploads`, data);
  return deleteResponse.data;
}