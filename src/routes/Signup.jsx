import { useState, useCallback } from "react";
import { useHistory } from "react-router";
import Helmet from "react-helmet";

import InputText from "../components/input/InputText";
import Button from "../components/input/Button";
import FormBox from "../components/input/FormBox";

import { postSignup } from "../lib/api";
import useToast from "../hooks/useToast";

const Signup = () => {
  const [signupForm, setSignupForm] = useState({
    email: "",
    username: "",
    password: "",
    password_re: "",
  });
  const history = useHistory();
  const { ToastFail, ToastSuccess } = useToast();

  const handleForm = useCallback(
    (e, target) => {
      setSignupForm({ ...signupForm, [target]: e.target.value });
    },
    [signupForm]
  );

  const handleSiginup = useCallback(
    (e) => {
      e.preventDefault();
      const sendSignup = async () => {
        const res = await postSignup(
          signupForm.email,
          signupForm.username,
          signupForm.password
        );
        if (res) {
          ToastSuccess("계정을 생성했습니다!");
          history.replace("/login");
        }
      };

      if (signupForm.password !== signupForm.password_re) {
        ToastFail("비밀번호가 서로 같지 않습니다.");
        return;
      }

      try {
        sendSignup();
      } catch (err) {
        ToastFail("이미 존재하는 이메일입니다.");
      }
    },
    [signupForm, history]
  );

  return (
    <FormBox onSubmit={handleSiginup}>
      <Helmet>
        <title>회원가입 - 로우팜</title>
      </Helmet>
      <label className="head">회원정보 입력</label>
      <InputText
        inputTitle="이메일"
        type="email"
        handler={handleForm}
        target="email"
        required
      />
      <InputText
        inputTitle="닉네임"
        type="text"
        handler={handleForm}
        target="username"
        required
      />
      <InputText
        inputTitle="비밀번호"
        type="password"
        handler={handleForm}
        target="password"
        required
      />
      <InputText
        inputTitle="비밀번호 확인"
        type="password"
        handler={handleForm}
        target="password_re"
        required
      />
      <Button>회원가입</Button>
    </FormBox>
  );
};

export default Signup;
