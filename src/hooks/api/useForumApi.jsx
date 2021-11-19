import { useCallback } from "react";
import useAxios from "./useAxios";

const useForumApi = () => {
  const { requestWrapper, getAxios } = useAxios();

  const loadForumList = useCallback(
    async (skip = 0, limit = 10, forumType = "전체", sortType = "date") => {
      const result = await requestWrapper(
        getAxios().get(`/forums`, {
          params: {
            skip: skip,
            limit: limit,
            forum_type: forumType,
            sort_type: sortType,
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
    async (key) => {
      const result = await requestWrapper(getAxios().get(`/forums/@${key}`));

      if (!result || result.status !== 200) {
        return null;
      }

      return result.data;
    },
    [getAxios]
  );

  const addForum = useCallback(
    async (title, forum_type, main) => {
      const result = await requestWrapper(
        getAxios().post(`/forums`, {
          title: title,
          forum_type: forum_type,
          main: main,
        })
      );

      if (!result || result.status !== 200) {
        return null;
      }

      return result.data;
    },
    [getAxios]
  );

  const addForumLike = useCallback(
    async (key) => {
      const result = await requestWrapper(
        getAxios().post(`/forums/@${key}/like`)
      );

      if (!result || result.status !== 200) {
        return null;
      }

      return result.data;
    },
    [getAxios]
  );

  const getForumLike = useCallback(
    async (key) => {
      const result = await requestWrapper(
        getAxios().get(`/forums/@${key}/like`)
      );

      if (!result || result.status !== 200) {
        return null;
      }

      return result.data;
    },
    [getAxios]
  );

  const removeForumLike = useCallback(
    async (key) => {
      const result = await requestWrapper(
        getAxios().delete(`/forums/@${key}/like`)
      );

      if (!result || result.status !== 200) {
        return null;
      }

      return result.data;
    },
    [getAxios]
  );

  return {
    loadForumList,
    loadDetail,
    addForum,
    addForumLike,
    getForumLike,
    removeForumLike,
  };
};

export default useForumApi;
