import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { jwtState, userState, JWT_CODE } from "../../recoil/user";

const USER_JWT = "userJwt";

const useJwtExpire = () => {
  const [user, setUser] = useRecoilState(userState);
  const [jwt, setJwt] = useRecoilState(jwtState);

  useEffect(() => {
    console.log(jwt, user);
    if (jwt.status === JWT_CODE.EXPIRED) {
      setJwt({
        status: JWT_CODE.NONE,
        data: null,
      });
      setUser(null);
      localStorage.removeItem(USER_JWT);
    }
  }, [jwt]);

  return;
};

export default useJwtExpire;
