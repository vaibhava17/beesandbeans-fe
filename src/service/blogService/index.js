import { deleteRequest, get, post, put } from "../../utils/api";

export const getAllBlogs = async (params) => {
  const blogsResponse = await get("/api/blogs", params);
  return blogsResponse.data;
};

export const getBlogById = async (id) => {
  const blogResponse = await get(`/api/blogs/${id}`);
  return blogResponse.data;
}

export const addBlog = async (data) => {
  const blogResponse = await post("/api/blogs", data, true, {
    "Content-Type": `multipart/form-data`
  });
  return blogResponse.data;
};

export const updateBlog = async (data, id) => {
  const blogResponse = await put(`/api/blogs/${id}`, data, true, {
    "Content-Type": `multipart/form-data`
  });
  return blogResponse.data;
};

export const deleteBlog = async (id) => {
  const deleteResponse = await deleteRequest(`/api/blogs/${id}`);
  return deleteResponse.data;
};

export const likeBlog = async (id) => {
  const likeResponse = await put(`/api/blogs/${id}/like`);
  return likeResponse.data;
};