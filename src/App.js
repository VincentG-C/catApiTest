import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./components/Home";
import Detail from "./components/Detail";

export default function App() {
  return (
    <Router>
        <Switch>
           <Route path="/detail/:id" render={({match}) => (
           <Detail id={match.params.id} /> )}>
            
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

    </Router>
  );
}