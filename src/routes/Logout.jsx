import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { useHistory } from "react-router";
import useUserRecoil from "../hooks/auth/useUserRecoil";

const Logout = () => {
  const { setLogout } = useUserRecoil();
  const history = useHistory();

  useEffect(() => {
    setLogout();
    history.replace("/");
  }, []);

  return (
    <div>
      <Helmet>
        <title>로그인 - 로우팜</title>
      </Helmet>
    </div>
  );
};

export default Logout;
