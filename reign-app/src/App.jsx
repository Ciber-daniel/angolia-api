import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// pages
import Home from "./screens/home/home";
import PostDetails from "./screens/post-details/post-details";
// styles

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/details" component={PostDetails} />
    </Switch>
  </Router>
);

export default App;
