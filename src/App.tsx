import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Nav } from "./components/Nav";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import DefaultRoute from "./routes/DefaultRoute";
import { TableRoute } from "./routes/TableRoute";
import { FormRoute } from "./routes/FormRoute";
import { ChartRoute } from "./routes/ChartRoute";

function App() {
  return (
    <div className="App">
      <Nav />
      <Router>
        <Routes>
          <Route path="/" Component={DefaultRoute} />
          <Route path="/table" Component={TableRoute} />
          <Route path="/form" Component={FormRoute} />
          <Route path="/chart" Component={ChartRoute} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
