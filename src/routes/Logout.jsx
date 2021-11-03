import React, { useEffect } from "react";
import { useHistory } from "react-router";
import useUserRecoil from "../hooks/useUserRecoil";

const Logout = () => {
  const { setLogout } = useUserRecoil();
  const history = useHistory();

  useEffect(() => {
    setLogout();
    history.replace("/");
  }, []);

  return <div></div>;
};

export default Logout;
