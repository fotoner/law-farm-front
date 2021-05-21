import styled from "styled-components";
import React from 'react';

const Wrapper2 = styled.section`
    
    padding: 10px;
    border-top: 1px solid #c4c4c4fd;
    font-size: 11px;
    font-size: 12px;
    background-color:#f1f1f1;
    text-align: center;
    color:  #222;
    position: fixed;
    left :0; 
    width : 100%;
    bottom : 0;
  
`;

const Footer = () => (
  <Wrapper2>
  ⓒ 2021 Law-Farm Project 
  </Wrapper2>

);

export default Footer;