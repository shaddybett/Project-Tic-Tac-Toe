import React from "react";
import { Switch, Route } from "react-router-dom";
import Game from "./Game";
import SignupForm from "./signup";
import Select from "./Select"; // Import the Select component
import AllScores from "./AllScores";

function App() {
  return (
    <div>
      <main>
        <Switch>
          <Route exact path="/game">
            <Game />
          </Route>
          <Route exact path="/select">
            <Select />
          </Route>
          <Route exact path="/scores">
            <AllScores />
          </Route>
          <Route exact path="/">
            <SignupForm />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
