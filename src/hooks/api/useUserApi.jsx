import { useCallback } from "react";
import useAxios from "./useAxios";

const useUserApi = () => {
  const { requestWrapper, getAxios } = useAxios();

  const getUserInfo = useCallback(async () => {
    const result = await requestWrapper(getAxios().get(`/users/me`));

    if (!result || result.status !== 200) {
      return null;
    }

    return result.data;
  }, [getAxios]);

  const getOtherUserInfo = useCallback(
    async (userId) => {
      const result = await requestWrapper(getAxios().get(`/users/@${userId}`));

      if (!result || result.status !== 200) {
        return null;
      }

      return result.data;
    },
    [getAxios]
  );

  return { getUserInfo, getOtherUserInfo };
};

export default useUserApi;
