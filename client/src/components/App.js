import { Switch, Route } from "react-router-dom";
import Game from "./Game";
import SignupForm from "./signup";

function App() {
  return (
    <div>
      <main>
        <Switch>
        {/* <Route exact path="/login">
            <Login />
          </Route> */}
          <Route exact path="/game">
            <Game/>
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