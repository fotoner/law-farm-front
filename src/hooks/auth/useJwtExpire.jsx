import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { jwtState, userState, JWT_CODE } from "../../recoil/user";

const USER_JWT = "userJwt";

const useJwtExpire = () => {
  // eslint-disable-next-line
  const [user, setUser] = useRecoilState(userState);
  const [jwt, setJwt] = useRecoilState(jwtState);

  useEffect(() => {
    if (jwt.status === JWT_CODE.EXPIRED) {
      setJwt({
        status: JWT_CODE.NONE,
        data: null,
      });
      setUser(null);
      localStorage.removeItem(USER_JWT);
    }
  }, [jwt]);
};

export default useJwtExpire;
