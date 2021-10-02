import { useState, useCallback } from "react";

import InputText from "../components/InputText";
import Button from "../components/Button";
import FormBox from "../components/FormBox";

const Signup = () => {
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    password_re: ""
  });

  const handleForm = useCallback(
    (e, target) => {
      setSignupForm({ ...signupForm, [target]: e.target.value });
    },
    [signupForm]
  );

  return (
    <FormBox>
      <label className="head">회원가입</label>
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
