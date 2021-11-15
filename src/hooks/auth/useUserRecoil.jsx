import { useCallback } from "react";
import { useRecoilState } from "recoil";

import useToast from "../useToast";
import { jwtState, userState, JWT_CODE } from "../../recoil/user";

import { getLoginToken, testLoginToken } from "../../lib/api";

const USER_JWT = "userJwt";

const useUserRecoil = () => {
  const [user, setUser] = useRecoilState(userState);
  const [jwt, setJwt] = useRecoilState(jwtState);
  const { ToastSuccess, ToastFail } = useToast();

  const setLogout = useCallback(() => {
    setJwt({
      data: null,
      status: JWT_CODE.EXPIRED,
    });
    ToastFail("로그아웃 되었습니다.")
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

  const setLogin = useCallback(
    (email, password) => {
      getLoginToken(email, password)
        .then((res) => {
          const resultJwt = res.data;
          localStorage.setItem(USER_JWT, JSON.stringify(resultJwt));
          loadUser(resultJwt);
          ToastSuccess("로그인에 성공하였습니다!");
        })
        .catch((err) => {
          setJwt({
            ...jwt,
            status: JWT_CODE.FAIL,
          });
          ToastFail("잘못된 비밀번호입니다.");
        });
    },
    [jwt]
  );

  const initUserState = useCallback(() => {
    const resultJwt = JSON.parse(localStorage.getItem(USER_JWT));

    if (resultJwt) {
      loadUser(resultJwt);
    }
  }, []);

  return { user, setLogin, setLogout, initUserState };
};

export default useUserRecoil;
