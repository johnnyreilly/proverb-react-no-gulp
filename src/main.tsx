import "babel-polyfill";
import * as React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import App from "./features/layout/App";

// __CONNECTION_URL__: JSON.stringify('http://localhost:7778/')

ReactDOM.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById("content"));
