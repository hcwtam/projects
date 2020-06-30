import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import "./App.css";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Forms from "./components/Forms/Forms";
import Select from "./components/Select/Select";
import Stats from "./components/Stats/Stats";
import {
  pullDData,
  pullBRData,
  pushBPData,
  pushOPData,
  legsData,
} from "./components/Forms/formData";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/home" component={Home} />
        <Route
          path="/pull"
          exact
          render={() => (
            <Select
              title="pull"
              options={["deadlifts", "barbell rows"]}
              main={["D", "BR"]}
            />
          )}
        />
        <Route
          path="/pull/D"
          exact
          render={() => <Forms data={pullDData} title="pull (D)" />}
        />
        <Route
          path="/pull/BR"
          exact
          render={() => <Forms data={pullBRData} title="pull (BR)" />}
        />
        <Route
          path="/push"
          exact
          render={() => (
            <Select
              title="push"
              options={["bench press", "overhead press"]}
              main={["BP", "OP"]}
            />
          )}
        />
        <Route
          path="/push/BP"
          exact
          render={() => <Forms data={pushBPData} title="push (BP)" />}
        />
        <Route
          path="/push/OP"
          exact
          render={() => <Forms data={pushOPData} title="push (OP)" />}
        />
        <Route
          path="/legs"
          render={() => <Forms data={legsData} title="legs" />}
        />
        <Route path="/stats" render={() => <Stats title="stats" />} />
        <Redirect from="*" to="/home" />
      </Switch>
    </div>
  );
}

export default App;
