import React from "react";
import ReactDOM from "react-dom";

import Root from "./Root";
import "./css/core.css";

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider> */}
      <Root />
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
