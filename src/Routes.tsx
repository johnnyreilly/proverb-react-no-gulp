import * as React from "react";
import { Route, IndexRedirect } from "react-router";

import Greeting from "./features/greeting/Page";
import Sages from "./features/sages/Page";
import SageDetail from "./features/sage/detail/Page";
import SageEdit from "./features/sage/edit/Page";
import About from "./features/about/Page";
import App from "./features/layout/App";

export function getRoutes() {
  return (
    <Route path="/" component={App}>
      <IndexRedirect to="/greeting" />
      <Route path="greeting" component={Greeting}/>
      <Route path="dashboard" component={Greeting}/>
      <Route path="sages" component={Sages}/>
      <Route path="sage/detail/:id" component={SageDetail}/>
      <Route path="sage/edit/:id" component={SageEdit}/>
      <Route path="sayings" component={Greeting}/>
      <Route path="about" component={About}/>
    </Route>
  );
}
