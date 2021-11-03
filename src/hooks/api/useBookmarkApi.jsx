import { useCallback } from "react";
import useAxios from "./useAxios";

const useBookmarkApi = () => {
  const { requestWrapper, getAxios } = useAxios();

  const getBookmarkList = useCallback(async () => {
    const result = await requestWrapper(getAxios().get(`/bookmarks/me`));

    if (result.status !== 200) {
      return null;
    }

    return result.data;
  }, [getAxios()]);

  const getBookmark = useCallback(
    async (contentsKey, contentsType = "article") => {
      const result = await requestWrapper(
        getAxios().get(`/bookmarks/${contentsType}/@${contentsKey}`)
      );

      if (result.status !== 200) {
        return null;
      }

      return result.data;
    },
    [getAxios]
  );

  const addBookmark = useCallback(
    async (contentsKey, contentsType = "article") => {
      const result = await requestWrapper(
        getAxios().post(`/bookmarks/${contentsType}/@${contentsKey}`)
      );

      if (result.status !== 200) {
        return null;
      }

      return result.data;
    },
    [getAxios]
  );

  const deleteBookmark = useCallback(
    async (contentsKey, contentsType = "article") => {
      const result = await requestWrapper(
        getAxios().delete(`/bookmarks/${contentsType}/@${contentsKey}`)
      );

      if (result.status !== 200) {
        return null;
      }

      return result.data;
    },
    [getAxios]
  );

  return { getBookmarkList, getBookmark, addBookmark, deleteBookmark };
};

export default useBookmarkApi;
