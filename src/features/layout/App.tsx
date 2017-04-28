import React from "react";
import TopNav from "./TopNav";
import { Route, Switch } from "react-router-dom";

import Greeting from "../greeting/Page";
import Sages from "../sages/Page";
import SageDetail from "../sage/detail/Page";
import SageEdit from "../sage/edit/Page";
import Sayings from "../sayings/Page";
import SayingDetail from "../saying/detail/Page";
import SayingEdit from "../saying/edit/Page";
import About from "../about/Page";

const App: React.SFC<any> = _props => (
  <div>
    <TopNav />

    <Switch>
      <Route exact path="/" component={Greeting} />
      <Route path="/sages" component={Sages} />
      <Route path="/sage/detail/:id" component={SageDetail} />
      <Route path="/sage/edit/:id" component={SageEdit} />
      <Route path="/sayings" component={Sayings} />
      <Route path="/saying/detail/:id" component={SayingDetail} />
      <Route path="/saying/edit/:id" component={SayingEdit} />
      <Route path="/about" component={About} />
    </Switch>
  </div>
);

export default App;
