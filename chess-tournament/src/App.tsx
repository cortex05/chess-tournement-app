import { StrictMode, useReducer } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";


import Home from "./screens/Home/Home";
import New from "./screens/New/New";
import Saved from "./screens/Saved/Saved";
import Tournament from "./screens/Tournament/Tournament";
import { State, StateDispatch } from "./state/state";
import { initialState, reducer } from "./state/reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <State.Provider value={state}>
      <StateDispatch.Provider value={dispatch}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/tournament/:tourney" element={<Tournament />} />
        </Routes>
      </BrowserRouter>
      </StateDispatch.Provider>
    </State.Provider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
