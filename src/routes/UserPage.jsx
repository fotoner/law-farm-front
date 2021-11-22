import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";

import UserDetail from "../components/UserDetail";
import { useRecoilState } from "recoil";
import { JWT_CODE, jwtState } from "../recoil/user";
import useUserApi from "../hooks/api/useUserApi";
import useUserRecoil from "../hooks/auth/useUserRecoil";

const PageStyle = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  width: 100%;
`;

const UserPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [jwt] = useRecoilState(jwtState);
  const history = useHistory();

  const { getOtherUserInfo } = useUserApi();
  const { user } = useUserRecoil();
  const { userId } = useParams();

  useEffect(() => {
    const loadUserInfo = async () => {
      const res = await getOtherUserInfo(userId);

      setUserInfo(res);
    };
    console.log(user);
    if (jwt.status === JWT_CODE.NONE) {
      history.replace("/");
    } else if (jwt.status === JWT_CODE.OK && userId) {
      if (Number(userId) === Number(user.id)) {
        history.replace("/mypage");
        return;
      }
      loadUserInfo();
    }
  }, [jwt, userId, user]);

  return (
    <PageStyle>{userInfo && <UserDetail userInfo={userInfo} />}</PageStyle>
  );
};

export default UserPage;
