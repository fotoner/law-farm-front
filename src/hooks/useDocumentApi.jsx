import { useCallback } from "react";
import { useRecoilState } from "recoil";

import baseAxios from "../lib/baseAxios";

import { jwtState, JWT_CODE } from "../recoil/user";

const useDocumentApi = () => {
  const [jwt] = useRecoilState(jwtState);

  const requestWrapper = async (request) => {
    try {
      const res = await request;

      return res;
    } catch (err) {
      console.log(err.response);
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

  const searchDocument = useCallback(
    async (query, target = "article", size = 25) => {
      const result = await requestWrapper(
        getAxios().get("/recommends/search", {
          params: {
            query: query,
            target: target,
            size: size,
          },
        })
      );

      if (result.status !== 200) {
        return null;
      }

      return result.data;
    },
    [getAxios]
  );

  const loadDetail = useCallback(
    async (key, target = "article") => {
      const result = await requestWrapper(
        getAxios().get(`/laws/${target}/@${key}`)
      );

      if (result.status !== 200) {
        return null;
      }

      return result.data;
    },
    [getAxios]
  );

  const relatedDocument = useCallback(
    async (key, target = "article", size = 25) => {
      const result = await requestWrapper(
        getAxios().get(`/recommends/${target}`, {
          params: {
            key: key,
            size: size,
          },
        })
      );

      if (result.status !== 200) {
        return null;
      }

      return result.data;
    },
    [getAxios]
  );

  const addBookmark = useCallback(
    async (key, target = "article") => {
      const result = await requestWrapper(
        getAxios().get("/bookmarks/me", {
          params: {
            content_key: key,
            content_type: target,
          },
        })
      );
      if (result.status !== 200) {
        return null;
      }

      return result.data;
    },
    [getAxios]
  );

  return { searchDocument, loadDetail, relatedDocument, addBookmark };
};

export default useDocumentApi;
