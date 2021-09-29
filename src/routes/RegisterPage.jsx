import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";


function RegisterPage(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPasword, setConfirmPasword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPasword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };





  return (
    
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "512px",
        height: "100vh",
        color : "black",
        
      }}>
      <Header/>  
      <form
        onSubmit={onSubmitHandler}
        style={{ display: "flex", flexDirection: "column",  }}>
        <label>아이디(이메일)</label>
        <input  type="email" value={Email} onChange={onEmailHandler} />

        <label>이름</label>
        <input type="test" value={Name} onChange={onNameHandler} />

        <label>비밀번호</label>
        <input type="password" value={Password} onChange={onPasswordHanlder} />

        <label>비밀번호 확인</label>
        <input
          type="password"
          value={ConfirmPasword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button type="submit">회원 가입</button>
      </form>
      <Footer/>
    </div>
  );
}

export default RegisterPage;