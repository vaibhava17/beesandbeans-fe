import { get, post, put, deleteRequest } from "../../utils/api";

export const getAllAddresses = async () => {
  const addressResponses = await get("/api/addresses");
  return addressResponses.data;
};

export const addAddress = async (data) => {
  const addressResponse = await post("/api/addresses", data);
  return addressResponse.data;
};

export const updateAddress = async (data, id) => {
  const addressResponse = await put(`/api/addresses/${id}`, data);
  return addressResponse.data;
};

export const deleteAddress = async (id) => {
  const deleteResponse = await deleteRequest(`/api/addresses/${id}`);
  return deleteResponse.data;
}

export const getAddressById = async (id)=>{
  const addressResponse = await get(`/api/addresses/${id}`);
  return addressResponse.data
}