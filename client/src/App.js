import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "./components/Navbar";
import { ShoppingList } from "./components/ShoppingList";
import { CreateItem } from "./components/CreateItem";
import { EditItem } from "./components/EditItem";
import { GlobalProvider } from "./contexts/GlobalContext";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div className="App">
          <Navbar />
          <br />
          <Route path="/" exact component={ShoppingList} />
          <Route path="/edit/:id" component={EditItem} />
          <Route path="/create" component={CreateItem} />
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
