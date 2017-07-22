import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Main from "./pages/Main";
import Layout from "./pages/Layout";
import Admin from "./pages/Admin";
import Webpage from "./pages/Webpage";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Webpage}></IndexRoute>
      <Route path="main" name="main" component={Main}></Route>
      <Route path="admin" name="admin" component={Admin}></Route>

    </Route>
  </Router>,
app);
