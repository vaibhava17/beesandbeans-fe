import axios from "axios/index";
import _ from "lodash";
import { cookie } from "./cookie";
import { AUTH_TOKEN, API_URL } from "constants/initial";

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const authHeader = () => {
  const token = cookie.get(AUTH_TOKEN);
  if(token){
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};

const getHeaders = auth => {
  let headers = { ...defaultHeaders };
  if (auth) {
    headers = { ...headers, ...authHeader() };
  }
  return headers;
};

const url = (path, params) => {
  const sections = path.split(":");

  const sectionsWithParams = sections.map(section =>
    _.startsWith(section, "/") ? section : params[section]
  );
  const pathWithParams = sectionsWithParams.join("");
  return API_URL + pathWithParams;
};

const apiService = axios.create({});

export const get = (path, params = {}, auth = true, headers = {}) =>
  apiService.get(url(path, params), {
    params
  });

export const post = (path, params = {}, auth = true) =>
  apiService.post(url(path, params), params);

export const put = (path, params = {}, auth = true) =>
  apiService.put(url(path, params), params);

export const deleteRequest = (path, params = {}, auth = true) =>
  apiService.delete(url(path, params), { params });

apiService.interceptors.request.use(request => {
  request.headers = getHeaders(true)
  return request;
});

apiService.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error.response);
  }
);
