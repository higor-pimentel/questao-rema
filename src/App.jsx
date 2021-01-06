import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import Entradas from "./components/basicos/Inputs";
import Resolucao from "./components/basicos/Resolucao";

export default () => {
  return (
    <div className="App">
      <h2>Projeto Rema</h2>
      <Router>
        <TransitionGroup>
          <CSSTransition classNames="fade" timeout={300}>
            <Switch>
              <Route exact path="/">
                <Entradas className="App" />
              </Route>
              <Route exact path="/resolucao">
                <Resolucao />
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Router>
    </div>
  );
};
