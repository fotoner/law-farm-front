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

  const getRecommendStatue = useCallback(
    async (key, size = 10) => {
      const result = await requestWrapper(
        getAxios().get(`/recommends/forum/@${key}/statute`, {
          params: {
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

  const getRecommendArticle = useCallback(
    async (key, size = 5) => {
      const result = await requestWrapper(
        getAxios().get(`/recommends/forum/@${key}/article`, {
          params: {
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

  const loadCommentList = useCallback(
    async (forumId) => {
      const result = await requestWrapper(
        getAxios().get(`/forums/@${forumId}/comment`)
      );

      if (!result || result.status !== 200) {
        return null;
      }

      return result.data;
    },
    [getAxios]
  );

  const addComment = useCallback(
    async (forumId, main) => {
      const result = await requestWrapper(
        getAxios().post(`/forums/@${forumId}/comment`, {
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

  const removeComment = useCallback(
    async (forumId) => {
      const result = await requestWrapper(
        getAxios().delete(`/forums/@${forumId}/comment`)
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
    getRecommendStatue,
    getRecommendArticle,
    loadCommentList,
    addComment,
    removeComment,
  };
};

export default useForumApi;
