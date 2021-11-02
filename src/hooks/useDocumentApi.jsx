import { useCallback } from "react";
import { useRecoilState } from "recoil";

import baseAxios from "../lib/baseAxios";

import { jwtState, JWT_CODE } from "../recoil/user";

const useDocumentApi = () => {
  const [jwt] = useRecoilState(jwtState);

  const getAxios = useCallback(() => {
    const axios = baseAxios;
    if (jwt.status === JWT_CODE.OK) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${jwt.data.access_token}`;
    }
    return axios;
  }, [jwt]);

  const searchDocument = useCallback(
    (query, target = "article", size = 25) => {
      return getAxios().get("/recommends/search", {
        params: {
          query: query,
          target: target,
          size: size,
        },
      });
    },
    [getAxios]
  );

  const loadDetail = useCallback(
    (key, target = "article") => {
      return getAxios().get(`/laws/${target}/@${key}`);
    },
    [getAxios]
  );

  const relatedDocument = useCallback(
    (key, target = "article", size = 25) => {
      return getAxios().get(`/recommends/${target}`, {
        params: {
          key: key,
          size: size,
        },
      });
    },
    [getAxios]
  );

  return { searchDocument, loadDetail, relatedDocument };
};

export default useDocumentApi;
