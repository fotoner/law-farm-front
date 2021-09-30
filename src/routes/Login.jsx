import React from "react";
import styled from "styled-components";

import colors from "../lib/colors";

const Inner = styled.article`
  width: 100vw;
  min-height: 100vh;
  background-color: ${colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;

  & > .header-gap {
    height: 64px;
    width: 100%;
    background-color: #fff;
  }
  & > .inner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 1;
  }
`;

const LoginBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  width: 40rem;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 10px 10px 20px 1px rgb(0 0 0 / 5%);
  border-radius: 1rem;

  .head {
    font-weight: bold;
    font-size: 32px;
    color: ${colors.fontDarkGrey};
  }
`;

const Login = () => {
  return (
    <Inner className="login">
      <div className="header-gap" />
      <div className="inner">
        <LoginBox>
          <div className="head">로그인</div>
        </LoginBox>
      </div>
    </Inner>
  );
};

export default Login;
