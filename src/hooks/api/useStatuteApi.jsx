import { useCallback } from "react";
import useAxios from "./useAxios";

const useStatuteApi = () => {
  const { requestWrapper, getAxios } = useAxios();

  const getStatuteCategory = useCallback(async () => {
    const result = await requestWrapper(getAxios().get(`/laws/statute/types`));

    if (!result || result.status !== 200) {
      return null;
    }

    return result.data;
  }, [getAxios]);

  const getStatute = useCallback(
    async (key, skip = 0, limit = 10) => {
      console.log(limit);
      const result = await requestWrapper(
        getAxios().get(`/laws/statute/@${key}`, {
          params: {
            skip: skip,
            limit: limit,
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

  return { getStatuteCategory, getStatute };
};

export default useStatuteApi;
