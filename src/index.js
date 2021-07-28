import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Amplify from "aws-amplify";
import config from "aws-exports";
import "index.css";
import App from "App";

Amplify.configure(config);

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);
