import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Navbar from "./components/layouts/Navbar";
import TweetResult from "./components/search/TweetResult";
import "./App.css";

//give store access to all the components

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
