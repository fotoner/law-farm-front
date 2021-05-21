import styled from "styled-components";
import React from 'react';
import colors from "../lib/colors";

const Wrapper = styled.section`
    /* 레이아웃 */
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 100%;
    left:0;
    top:0;
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
  margin-left : 30px;
  font-size : 22px;
  color: white;
  font-weight: bold;

`;

const Button = styled.button`
  border-radius:0.5rem;
  font-size : 1rem;
  color: black;
    background-color:#f1f1f1;
  min-width:120px;
  margin-left : 1rem;
  margin-right: 10px;
  align-items:center;
  right:0;
  justify-content: between;
`;


const Header = () => (
  
     <Wrapper>
        <Title>Law-farm</Title>
        <Button>로그인</Button>
        <Button>회원가입</Button>
     </Wrapper>
 
);

export default Header;