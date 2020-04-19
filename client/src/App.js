import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import TweetResult from "./components/search/TweetResult";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Navbar />
          <TweetResult />
        </div>
      </Provider>
    );
  }
}

export default App;
