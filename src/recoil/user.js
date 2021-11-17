import { atom } from "recoil";

const userState = atom({
  key: 'userState',
  default: null
})

const JWT_CODE = {
  NULL: "JWT_NULL",
  NONE: "JWT_NONE",
  OK: "JWT_OK",
  EXPIRED: "JWT_EXPIRED",
  FAIL: "JWT_FAIL",
}

const jwtState = atom({
  key: 'jwtState',
  default: {
    status: JWT_CODE.NULL,
    data : null
  }
})

export {
  userState,
  jwtState,
  JWT_CODE
}