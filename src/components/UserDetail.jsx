import React from "react";
import styled from "styled-components";
import { AiOutlineMail } from "react-icons/ai";

import colors from "../lib/colors";

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 96px 0 0 0;
  .username {
    font-size: 36px;
    font-weight: bold;
    color: ${colors.highlightColor};
  }
  .introduce {
    margin: 8px 0;
    color: ${colors.fontDarkGrey};
  }
  .email {
    color: ${colors.fontGrey};
    display: flex;
    align-items: center;

    svg {
      padding-top: 4px;
    }

    a {
      color: ${colors.fontGrey};
      margin-left: 8px;

      :hover {
        text-decoration: underline;
      }
    }
  }
`;

const UserDetail = ({ userInfo }) => {
  return (
    <UserInfo>
      <div className="username">{userInfo.username}</div>
      <div className="introduce">자기소개가 없습니다.</div>
      <div className="email">
        <AiOutlineMail />{" "}
        <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
      </div>
    </UserInfo>
  );
};

export default UserDetail;
