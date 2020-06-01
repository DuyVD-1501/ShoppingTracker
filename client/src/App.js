import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "./components/Navbar";
import { ShoppingList } from "./components/ShoppingList";
import { CreateItem } from "./components/CreateItem";
import { EditItem } from "./components/EditItem";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Home from "./components/Home";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <br />
          <Route path="/" exact component={Home} />
          <Route path="/list" component={ShoppingList} />
          <Route path="/edit/:id" component={EditItem} />
          <Route path="/create" component={CreateItem} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
