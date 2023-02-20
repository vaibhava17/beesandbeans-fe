import { get, post, put, deleteRequest } from "../../utils/api";

export const userLogin = async (data) => {
  const userResponse = await post("/api/users/login", data);
  return userResponse.data;
};

export const userSignup = async (data) => {
  const userResponse = await post("/api/users", data);
  return userResponse.data;
};

export const getUserProfile = async () => {
  const userResponse = await get("/api/users/profile");
  return userResponse.data;
};

export const updateUser = async (data) => {
  const userResponse = await put("/api/users/user", data, true, {
    "Content-Type": `multipart/form-data`
  });
  return userResponse.data;
};

export const getAllUsers = async (params) => {
  const usersData = await get("/api/users", params);
  return usersData.data;
};

export const getUserById = async (id) => {
  const userData = await get(`/api/users/${id}`);
  return userData.data;
};

export const updateUserById = async (data, id) => {
  const userData = await put(`/api/users/${id}`, data);
  return userData.data;
};

export const deleteUser = async (id) => {
  const deleteResponse = await deleteRequest(`/api/users/${id}`);
  return deleteResponse.data;
}

export const getVisitorCount = async () => {
  const locationResponse = await get("/api/data/visitors/count");
  return locationResponse.data;
}

export const getAllVisitors = async () => {
  const visitorResponse = await get("/api/data/visitors");
  return visitorResponse.data;
}

export const addVisitor = async (data) => {
  const visitorResponse = await post("/api/data/visitors", data);
  return visitorResponse.data;
}
