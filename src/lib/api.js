import baseAxios from "./baseAxios";
import qs from "query-string";

const getLoginToken = (email, password) => {
  return baseAxios.post(
    `/login/access-token`,
    qs.stringify({
      username: email,
      password: password,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
};

const testLoginToken = (jwt) => {
  return baseAxios.post(`/login/test-token`, {}, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

const postSignup = (email, username, password) => {};

export {
  getLoginToken,
  testLoginToken,
  postSignup,
};
