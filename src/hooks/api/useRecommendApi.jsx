import { useCallback } from "react";
import useAxios from "./useAxios";

const useRecommendApi = () => {
  const { requestWrapper, getAxios } = useAxios();

  const getCombinedRecommend = useCallback(
    async (target = "article") => {
      const result = await requestWrapper(
        getAxios().get(`/recommends/combined/${target}`)
      );

      if (!result || result.status !== 200) {
        return null;
      }

      return result.data;
    },
    [getAxios]
  );

  const getLogRecommend = useCallback(
    async (target = "article") => {
      const result = await requestWrapper(
        getAxios().get(`/recommends/log/${target}`)
      );

      if (!result || result.status !== 200) {
        return null;
      }

      return result.data;
    },
    [getAxios]
  );

  const getBookmarkRecommend = useCallback(
    async (target = "article") => {
      const result = await requestWrapper(
        getAxios().get(`/recommends/bookmark/${target}`)
      );

      if (!result || result.status !== 200) {
        return null;
      }

      return result.data;
    },
    [getAxios]
  );

  return { getCombinedRecommend, getLogRecommend, getBookmarkRecommend };
};

export default useRecommendApi;
