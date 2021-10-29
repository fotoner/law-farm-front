import { useCallback } from "react";
import { useRecoilState } from "recoil";

import { jwtState, userState, JWT_CODE } from "../recoil/user";

import { getLoginToken, testLoginToken } from "../lib/api";

const USER_JWT = "userJwt";

const useUserRecoil = () => {
  const [user, setUser] = useRecoilState(userState);
  const [jwt, setJwt] = useRecoilState(jwtState);

  const setLogout = useCallback(() => {
    setJwt({
      data: null,
      status: JWT_CODE.EXPIRED,
    });
  }, []);

  const loadUser = useCallback((resultJwt) => {
    testLoginToken(resultJwt.access_token)
      .then((res) => {
        setUser(res.data);
        setJwt({
          status: JWT_CODE.OK,
          data: resultJwt,
        });
      })
      .catch((err) => {
        setLogout();
      });
  }, []);

  const setLogin = useCallback((email, password) => {
    getLoginToken(email, password)
      .then((res) => {
        const resultJwt = res.data;
        localStorage.setItem(USER_JWT, JSON.stringify(resultJwt));
        loadUser(resultJwt);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  }, []);

  const initUserState = useCallback(() => {
    const resultJwt = JSON.parse(localStorage.getItem(USER_JWT));

    if (resultJwt) {
      loadUser(resultJwt)
    }
  }, []);

  return { user, setLogin, setLogout, initUserState };
};

export default useUserRecoil;
