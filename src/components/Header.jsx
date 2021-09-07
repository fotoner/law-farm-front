import styled from "styled-components";
import React from 'react';
import colors from "../lib/colors";
import { Route, Switch, useLocation,Link,withRouter, Router } from "react-router-dom";
import Navbar from "../components/Navbar";
const Wrapper = styled.section`
    /* 레이아웃 */
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 100%;
    left:0;
    top: 0px;
    z-index: 5;
    /* 색상 */
    background: ${colors.highlightColor};
    color: white;
    border-bottom: 1px solid ${colors.highlightColor};
    box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.20);
    /* 폰트 */
    font-size: 1.5rem;
`

const Title = styled.h1`
  display : flex;
  flex : 1;
  left : 50;
  margin-left : 20px;
  font-size : 22px;
  color: white;
  font-weight: bold;
`;

const Button = styled.button`
  border-radius:0.5rem;
  margin-bottom: 10px;
  font-size : 1rem;
  font-family : Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  color: Black;
  background-color:#f1f1f1;
  min-width: 130px;
  margin-left : 0rem;
  margin-right: 30px;
  align-items:center;
  right:0;
  justify-content: between;
`;


const Header = () => {

  return(

     <Wrapper>
         <Title>
          <Navbar/>
         </Title>
       <Link to ="/RegisterPage">
         <Button>회원가입</Button>
       </Link>
       <Link to ="/Login">
         <Button>로그인</Button>
       </Link>
     </Wrapper>


  )
  
    
 }


export default withRouter(Header);