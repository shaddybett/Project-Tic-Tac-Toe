import { Switch, Route } from "react-router-dom";
import Game from "./Game";
import SignupForm from "./signup";
import Login from "./UserLogin";
import { ScoreBoard } from "./ScoreBoard";
import '../index.css'

function App() {
  return (
    <div>
      <main>
        <Switch>
        <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/">
            <ScoreBoard />
          </Route>
          <Route exact path="/game">
            <Game/>
          </Route>
          <Route exact path="/signupform">
          <SignupForm />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;