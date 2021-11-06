import React from "react";
import Helmet from "react-helmet";

import styled from "styled-components";
import colors from "../lib/colors";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Title404 = styled.h1`
  margin: 0;
  font-size: 128px;
  color: ${colors.highlightColor};
`;

const Detail = styled.div`
  font-size: 24px;
  color: ${colors.fontGrey};
  margin-bottom: 128px;
`;

const NotFound = () => {
  return (
    <Content>
      <Helmet>
        <title>페이지를 찾을 수 없습니다 - 로우팜</title>
      </Helmet>
      <Title404>404</Title404>
      <Detail>페이지를 찾을 수 없습니다</Detail>
    </Content>
  );
};

export default NotFound;
