import React from "react";
import "../css/Board.css";
import styled from "styled-components";
import colors from "../lib/colors";

const DivisionLine = styled.hr`
  margin: 16px 0;
  width: 100%;
  border: 0;
  border-bottom: 1px solid ${colors.hrWhite};
`;

const FormStyle = styled.article`
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 1;
  }
`;
const FormMain = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  padding: 0.5rem 3rem;
  border-bottom: 1px solid #dedee6;
  width: 40rem;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 10px 10px 20px 1px rgb(0 0 0 / 5%);
  border-radius: 0.5rem;
  
  .head {
    font-weight: bold;
    font-size: 32px;
    color: ${colors.fontDarkGrey};
  }
  .inputBox {
    margin-bottom:16px;
  }
`;

const BoardPage = () => {
  return (
     <FormStyle>
      <div className="header-gap" />
      <div className="inner">
          
          <h1 className='title'>질문하기</h1>
          <FormMain>
            <div className = 'form-wrapper'>
            <input className = "title-input" type='text' placeholder ='질문 제목을 입력해주세요.'
            required="required"/>
            <textarea className="text-area" placeholder='본문 내용을 입력 해주세요.'></textarea>
            </div>
            
            <div className = 'submit-button'>질문하기</div>
            <DivisionLine/>
          </FormMain>
      </div>
    </FormStyle>
  )
}

export default BoardPage
