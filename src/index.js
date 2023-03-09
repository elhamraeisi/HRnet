import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Employee from "./pages/Employee";
import Form from "./pages/Home";
import Error from "./pages/Error";

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Switch>
      <Route exact path="/">
        <Form />
      </Route>
      <Route exact path="/employee">
        <Employee />
      </Route>
      <Route>
        <Error />
      </Route>
    </Switch>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
