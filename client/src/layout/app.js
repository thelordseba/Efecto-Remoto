import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import NavBar from "../containers/NavBar/NavBar.js";
import routes from "../routes";
import axios from "axios";
import jwt from "jsonwebtoken";
import * as constants from "../redux/reducers/constants";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (user) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        dispatch({ type: constants.SETCURRENTUSER, payload: user });
      }
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="routesContainer">
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </div>
      <footer className="footer">
        Copyright © 2020 Efecto Remoto. All rights reserved.
      </footer>
    </>
  );
}

export default App;
