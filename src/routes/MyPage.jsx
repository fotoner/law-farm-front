import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { useRecoilState } from "recoil";
import { JWT_CODE, jwtState } from "../recoil/user";

import styled from "styled-components";

import UserDetail from "../components/UserDetail";
import useUserApi from "../hooks/api/useUserApi";

const PageStyle = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  width: 100%;
`;

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const history = useHistory();

  const { getUserInfo } = useUserApi();

  const [jwt] = useRecoilState(jwtState);

  useEffect(() => {
    const loadUserInfo = async () => {
      const res = await getUserInfo();

      console.log(res);
      setUserInfo(res);
    };

    if (jwt.status === JWT_CODE.NONE) {
      history.replace("/");

      return;
    } else if (jwt.status === JWT_CODE.OK) {
      loadUserInfo();
    }
  }, [jwt]);

  return (
    <PageStyle>
      {userInfo && <UserDetail userInfo={userInfo}/>}
    </PageStyle>
  );
};

export default MyPage;
