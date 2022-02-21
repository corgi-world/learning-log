import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import TV from "./Routes/TV";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/tv">
          <TV />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path={["/", "/movies/:movieID"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
