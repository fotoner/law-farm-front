import { useState, useCallback, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Helmet from "react-helmet";
import styled from "styled-components";

import InputText from "../components/InputText";
import Button from "../components/Button";
import FormBox from "../components/FormBox";

import colors from "../lib/colors";

import useUserRecoil from "../hooks/useUserRecoil";

const DivisionLine = styled.hr`
  margin: 16px 0;
  width: 100%;
  border: 0;
  border-bottom: 1px solid ${colors.hrWhite};
`;

const SighupLink = styled.div`
  color: ${colors.fontGrey};
  a {
    color: ${colors.highlightColor};
    :hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const { user, setLogin } = useUserRecoil();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  useEffect(() => {
    if (user){
      history.replace("/")
    }
  }, [user, history]);

  const handleForm = useCallback(
    (e, target) => {
      setLoginForm({ ...loginForm, [target]: e.target.value });
    },
    [loginForm]
  );

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      setLogin(loginForm.email, loginForm.password);
    },
    [loginForm, setLogin]
  );

  return (
    <FormBox onSubmit={handleLogin}>
      <Helmet>
        <title>로그인 - 로우팜</title>
      </Helmet>
      <label className="head">로그인</label>
      <InputText
        inputTitle="이메일"
        type="email"
        handler={handleForm}
        target="email"
        required
      />
      <InputText
        inputTitle="비밀번호"
        type="password"
        handler={handleForm}
        target="password"
        required
      />
      <Button>로그인</Button>
      <DivisionLine />
      <SighupLink>
        로우팜이 처음이신가요? <Link to="/signup">회원가입</Link>
      </SighupLink>
    </FormBox>
  );
};

export default Login;
