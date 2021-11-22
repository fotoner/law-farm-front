import React from "react";
import { HashRouter } from "react-router-dom";

import { RecoilRoot } from "recoil";
import App from "./App";

const Root = () => {
  return (
    <HashRouter>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </HashRouter>
  );
};

export default Root;
