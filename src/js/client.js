import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Main from "./pages/Main";
import Layout from "./pages/Layout";
import Admin from "./pages/Admin";
import Webpage from "./pages/Webpage";
import Result from "./pages/Result";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Webpage}></IndexRoute>
      <Route path="main" name="main" component={Main}></Route>
      <Route path="admin" name="admin" component={Admin}></Route>
      <Route path="result" name="result" component={Result}></Route>

    </Route>
  </Router>,
app);
