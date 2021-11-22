import React from "react";
import styled from "styled-components";

import { AiOutlineClose } from "react-icons/ai";

import colors from "../../lib/colors";

const ModalStyle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
`;

const ModalBackground = styled.div`
  background-color: ${colors.fontGrey}70;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 900;
`;

const FormMain = styled.form`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  z-index: 990;
  padding: 64px;
  min-width: 30rem;
  max-width: 900px;
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 10px 10px 20px 1px rgb(0 0 0 / 5%);
  border-radius: 0.5rem;
`;

const FormClose = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 60px;
  width: 36px;
  height: 36px;
  box-sizing: border-box;
  top: 16px;
  right: 16px;
  color: ${colors.highlightColor};
  cursor: pointer;

  transition: background-color 0.15s;

  :hover {
    background-color: ${colors.lightColor}70;
  }
`;

const ModalForm = ({ children, handleModal, onSubmit }) => {
  return (
    <ModalStyle>
      <ModalBackground onClick={() => handleModal(false)} />
      <FormMain onSubmit={onSubmit}>
        <FormClose onClick={() => handleModal(false)}>
          <AiOutlineClose size={32} />
        </FormClose>
        {children}
      </FormMain>
    </ModalStyle>
  );
};

export default ModalForm;
