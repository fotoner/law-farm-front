import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import UserDetail from "../components/UserDetail";


const PageStyle = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  width: 100%;
`;

const UserPage = () => {
  return (
    <PageStyle>
      <UserDetail/>
    </PageStyle>
  );
};

export default UserPage;
