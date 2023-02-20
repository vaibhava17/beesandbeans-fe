import { deleteRequest, get, post, put } from "../../utils/api";

export const getAllMails = async (params) => {
  const mailsResponse = await get("/api/mails", params);
  return mailsResponse.data;
};

export const getMailById = async (id)=>{
  const mailResponse = await get(`/api/mails/${id}`);
  return mailResponse.data;
};

export const addMail = async (data) => {
  const mailResponse = await post("/api/mails", data);
  return mailResponse.data;
};

export const markMail = async (data, id) => {
  const mailResponse = await put(`/api/mails/${id}`, data);
  return mailResponse.data;
};

export const deleteMail = async (id) => {
  const deleteResponse = await deleteRequest(`/api/mails/${id}`);
  return deleteResponse.data;
};