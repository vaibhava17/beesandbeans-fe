import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import AppRoutes from "./routes/mapping";
import RootStore from "./store";
import { loadState } from "./store/initial";

const state = new RootStore();
loadState(state);

function App() {
  return (
    <Provider store={state}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
