import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { Viewer } from "@toast-ui/react-editor";

import useForumApi from "../hooks/api/useForumApi";

import colors from "../lib/colors";
import { useRecoilState } from "recoil";
import { JWT_CODE, jwtState } from "../recoil/user";
import useToast from "../hooks/useToast";

const PageStyle = styled.div`
  width: 100vw;
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

  .title {
    font-size: 36px;
    color: ${colors.highlightColor};
    margin: 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${colors.fontGrey};
  }
  .viewerWrapper {
    padding: 32px 0;
    min-height: 400px;
  }
`;

const ForumDetail = () => {
  const [jwt] = useRecoilState(jwtState);
  const history = useHistory();
  // const viewerRef = useRef();
  const { ToastFail } = useToast();
  const { key } = useParams();
  const [article, setArticle] = useState(null);

  const { loadDetail } = useForumApi();

  useEffect(() => {
    const loadArticle = async () => {
      const res = await loadDetail(key);
      console.log(res);
      setArticle(res);
    };

    if (jwt.status === JWT_CODE.NONE) {
      history.replace("/forum");
      ToastFail("열람을 위해 로그인 해주시기 바랍니다.");
    } else if (jwt.status === JWT_CODE.OK) {
      loadArticle();
    }
  }, [key, jwt]);

  return (
    <PageStyle>
      {article && (
        <MainWrapper>
          <MainContent>
            <h1 className="title">{article.title}</h1>
            <div className="subtitle">
              <div className="left">작성자: {article.user.username}</div>
              <div className="right">{article.created_at.slice(0, 10)}</div>
            </div>
            <div className="viewerWrapper">
              <Viewer initialValue={article.main} />
            </div>
          </MainContent>
        </MainWrapper>
      )}
    </PageStyle>
  );
};

export default ForumDetail;
