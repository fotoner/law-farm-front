import { useCallback } from "react";
import useAxios from "./useAxios";

const useDocumentApi = () => {
  const { requestWrapper, getAxios } = useAxios();

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

      if (!result || result.status !== 200) {
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

      if (!result || result.status !== 200) {
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

      if (!result || result.status !== 200) {
        return null;
      }

      return result.data;
    },
    [getAxios]
  );

  return { searchDocument, loadDetail, relatedDocument };
};

export default useDocumentApi;
