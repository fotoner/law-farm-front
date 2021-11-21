import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import Helmet from "react-helmet";

import { AiOutlineBulb, AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import styled from "styled-components";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";

import useForumApi from "../hooks/api/useForumApi";

import colors from "../lib/colors";
import { useRecoilState } from "recoil";
import { JWT_CODE, jwtState } from "../recoil/user";
import useToast from "../hooks/useToast";
import ForumRecommendContent from "../components/ForumRecommendContent";

const PageStyle = styled.div`
  position: absolute;
  width: 100%;
  //margin-left: calc(-50vw + 50%);
  min-height: 100vh;
  background-color: ${colors.background};
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #fff;
`;

const MainContent = styled.div`
  margin-top: 96px;
  max-width: 1024px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    width: 100%;
    font-size: 36px;
    color: ${colors.highlightColor};
    margin: 0;
  }
  .subtitle {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${colors.fontGrey};
  }
  .viewerWrapper {
    width: 100%;
    padding: 32px 0;
    min-height: 400px;
  }
  .counts {
    user-select: none;
    display: flex;
    color: ${colors.highlightColor};
    margin-bottom: 32px;
    font-size: 20px;
    span {
      margin-left: 8px;
      color: ${colors.fontGrey};
    }
    .view {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .like {
      cursor: pointer;
      padding: 8px;
      border-radius: 36px;
      margin-left: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.3s, background-color 0.3s;

      :hover {
        background-color: ${colors.like}0f;
        color: ${colors.like};
      }
    }
    .like .liked {
      color: ${colors.like};
    }
  }
`;

const ForumDetail = () => {
  const [jwt] = useRecoilState(jwtState);
  const history = useHistory();
  const { ToastFail } = useToast();
  const { key } = useParams();

  const [article, setArticle] = useState(null);
  const [reloaded, setReloaded] = useState(false);
  const [liked, setLiked] = useState(false);

  const { loadDetail, getForumLike, removeForumLike, addForumLike } =
    useForumApi();

  useEffect(() => {
    const loadArticle = async () => {
      const articleRes = await loadDetail(key);
      setArticle(articleRes);

      const likedRes = await getForumLike(key);
      setLiked(!!likedRes);

      setReloaded(true);
    };

    if (jwt.status === JWT_CODE.NONE) {
      history.replace("/forum");
      ToastFail("열람을 위해 로그인 해주시기 바랍니다.");
    } else if (jwt.status === JWT_CODE.OK && !reloaded) {
      loadArticle();
    }
  }, [key, jwt, reloaded]);

  const handleLike = useCallback(async () => {
    if (liked) {
      await removeForumLike(key);
    } else {
      await addForumLike(key);
    }
    setReloaded(false);
  }, [liked, key]);

  return (
    <PageStyle>
      {article && (
        <MainWrapper>
          <Helmet>
            <title>{article.title} - 포럼 - 로우팜</title>
          </Helmet>
          <MainContent>
            <h1 className="title">{article.title}</h1>
            <div className="subtitle">
              <div className="left">작성자: {article.user.username}</div>
              <div className="right">{article.created_at.slice(0, 10)}</div>
            </div>
            <div className="viewerWrapper">
              <Viewer initialValue={article.main} />
            </div>
            <div className="counts">
              <div className="view">
                <AiOutlineBulb size={28} />
                <span>{article.view_count}</span>
              </div>
              <div className="like" onClick={handleLike}>
                {liked ? (
                  <AiFillHeart className="liked" size={28} />
                ) : (
                  <AiOutlineHeart size={28} />
                )}
                <span>{article.like_count}</span>
              </div>
            </div>
          </MainContent>
          <ForumRecommendContent forumId={key} />
        </MainWrapper>
      )}
    </PageStyle>
  );
};

export default ForumDetail;
