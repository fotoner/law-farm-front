import { useCallback } from "react";
import useAxios from "./useAxios";

const useBookmarkApi = () => {
  const { requestWrapper, getAxios } = useAxios();

  const getLogList = useCallback(async () => {
    const result = await requestWrapper(getAxios().get(`/logs/me`));

    if (!result || result.status !== 200) {
      return null;
    }

    return result.data;
  }, [getAxios]);

  return { getLogList };
};

export default useBookmarkApi;
