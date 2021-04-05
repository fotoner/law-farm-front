import React from "react";
import { Route } from "react-router-dom";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SearchBar from "./components/SearchBar/SearchBar";

const App = () => {
  return (
    <div>
      <Header/>
      <SearchBar/>
      <Route path="/" component={Main} />
      <Footer/>
    </div>
        
  );
}


export default App;
