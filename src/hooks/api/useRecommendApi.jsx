import { useCallback } from "react";
import useAxios from "./useAxios";

const useRecommendApi = () => {
  const { requestWrapper, getAxios } = useAxios();

  const getCombinedRecommend = useCallback(async () => {
    const result = await requestWrapper(
      getAxios().get(`/recommends/combined/article`)
    );

    if (!result || result.status !== 200) {
      return null;
    }

    return result.data;
  }, [getAxios]);

  const getLogRecommend = useCallback(async () => {
    const result = await requestWrapper(
      getAxios().get(`/recommends/log/article`)
    );

    if (!result || result.status !== 200) {
      return null;
    }

    return result.data;
  }, [getAxios]);

  const getBookmarkRecommend = useCallback(async () => {
    const result = await requestWrapper(
      getAxios().get(`/recommends/bookmark/article`)
    );

    if (!result || result.status !== 200) {
      return null;
    }

    return result.data;
  }, [getAxios]);

  return { getCombinedRecommend, getLogRecommend, getBookmarkRecommend };
};

export default useRecommendApi;
