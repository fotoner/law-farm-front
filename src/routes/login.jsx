import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";


function Login(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };


  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
  };


  const onSubmitHandler = (e) => {
    e.preventDefault();
  };


const label = styled.label`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;



`

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
        style={{ display: "flex", flexDirection: "column" }}>
        <label  >아이디(이메일)</label>
        <input  type="email" value={Email} onChange={onEmailHandler} />

        <label>비밀번호</label>
        <input type="password" value={Password} onChange={onPasswordHanlder} />

        <br />
        <button type="submit">로그인</button>
      </form>
      <Footer/>
    </div>
  );
}


export default Login;