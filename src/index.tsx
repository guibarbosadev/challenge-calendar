import React from "react";
import Routes from "./routes";
import { Provider } from "mobx-react";
import { rootStore } from "./stores";

export default function App() {
  return (
    <Provider {...rootStore}>
      <Routes history={rootStore.history} />
    </Provider>
  );
}
