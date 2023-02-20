import { Cookies } from "react-cookie";

const cookies = new Cookies();

//!10 days expiry time
const set = (name, value, expire = 10 * 24 * 3600 * 1000) => {
  cookies.set(name, value, {
    expires: new Date(new Date().getTime() + expire)
  });
};

const get = name => {
  return cookies.get(name);
};

const erase = name => {
  cookies.remove(name);
};

export const cookie = {
  get,
  set,
  erase
};
