import { useCallback } from "react";
import useAxios from "./useAxios";
import useToast from "../useToast";

const useBookmarkApi = () => {
  const { requestWrapper, getAxios } = useAxios();
  const { ToastSuccess, ToastFail } = useToast();

  const getBookmarkList = useCallback(async () => {
    const result = await requestWrapper(getAxios().get(`/bookmarks/me`));

    if (!result || result.status !== 200) {
      return null;
    }

    return result.data;
  }, [getAxios]);

  const getBookmark = useCallback(
    async (contentsKey, contentsType = "article") => {
      const result = await requestWrapper(
        getAxios().get(`/bookmarks/${contentsType}/@${contentsKey}`)
      );

      if (!result || result.status !== 200) {
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

      if (!result || result.status !== 200) {
        ToastFail(`북마크에 추가에 실패했습니다.`);
        return null;
      }

      ToastSuccess(`'${contentsKey}'가 북마크에 추가 되었습니다.`);
      return result.data;
    },
    [getAxios]
  );

  const deleteBookmark = useCallback(
    async (contentsKey, contentsType = "article") => {
      const result = await requestWrapper(
        getAxios().delete(`/bookmarks/${contentsType}/@${contentsKey}`)
      );

      if (!result || result.status !== 200) {
        ToastFail(`북마크에 제거에 실패했습니다.`);
        return null;
      }

      ToastSuccess(`'${contentsKey}'가 북마크에서 제거 되었습니다.`);
      return result.data;
    },
    [getAxios]
  );

  return { getBookmarkList, getBookmark, addBookmark, deleteBookmark };
};

export default useBookmarkApi;
