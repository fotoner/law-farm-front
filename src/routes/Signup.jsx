import { useState, useCallback } from "react";
import Helmet from "react-helmet";

import InputText from "../components/input/InputText";
import Button from "../components/input/Button";
import FormBox from "../components/input/FormBox";

const Signup = () => {
  const [signupForm, setSignupForm] = useState({
    email: "",
    username: "",
    password: "",
    password_re: "",
  });

  const handleForm = useCallback(
    (e, target) => {
      setSignupForm({ ...signupForm, [target]: e.target.value });
    },
    [signupForm]
  );

  return (
    <FormBox>
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
