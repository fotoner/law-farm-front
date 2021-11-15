import React from "react";
import ReactDOM from "react-dom";

import Root from "./Root";
import "./css/core.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider> */}
      <ToastContainer/>
      <Root />
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
