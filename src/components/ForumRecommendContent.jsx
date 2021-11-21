import React, { useState, useEffect } from "react";
import styled from "styled-components";

import useForumApi from "../hooks/api/useForumApi";
import ResultContainer from "./ResultContainer";

import colors from "../lib/colors";

const PageStyle = styled.div`
  //min-height: 100vh;
  width: 100%;
  max-width: 1024px;
  box-sizing: border-box;
  padding: 0 20px;
`;

const Title = styled.h1`
  margin: 0 0 16px 0;
  color: ${colors.highlightColor};
  font-size: 24px;
  font-weight: normal;
`;

const ForumRecommendContent = ({ forumId }) => {
  const [articleList, setArticleList] = useState(null);
  const [reloaded, setReloaded] = useState(false);

  const { getRecommendArticle } = useForumApi();

  useEffect(() => {
    const loadContent = async () => {
      const articleRes = await getRecommendArticle(forumId);
      setArticleList(articleRes);

      setReloaded(true);
    };

    if (!reloaded && forumId) {
      loadContent();
    }
  }, [forumId, reloaded]);

  return (
    <PageStyle>
      <Title>관련 법률</Title>
      {articleList && <ResultContainer articleList={articleList.result} />}
    </PageStyle>
  );
};

export default ForumRecommendContent;
