import { useCallback } from "react";
import { useRecoilState } from "recoil";

import baseAxios from "../../lib/baseAxios";

import { jwtState, JWT_CODE } from "../../recoil/user";

const useAxios = () => {
  const [jwt] = useRecoilState(jwtState);

  const requestWrapper = async (request) => {
    try {
      const res = await request;

      return res;
    } catch (err) {
      return err.response;
    }
  };

  const getAxios = useCallback(() => {
    const axios = baseAxios;
    if (jwt.status === JWT_CODE.OK) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${jwt.data.access_token}`;
    }
    return axios;
  }, [jwt]);

  return {requestWrapper, getAxios}
};

export default useAxios;
