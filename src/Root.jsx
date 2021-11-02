import React from "react";
import { BrowserRouter } from "react-router-dom";

import { RecoilRoot } from "recoil";
import App from "./App";

const Root = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default Root;
