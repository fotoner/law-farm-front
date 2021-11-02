import React, { useEffect } from "react";
import useUserRecoil from "../hooks/useUserRecoil";

const Logout = ({ history }) => {
  const { setLogout } = useUserRecoil();

  useEffect(() => {
    setLogout();
    history.replace("/");
  }, []);

  return <div></div>;
};

export default Logout;
