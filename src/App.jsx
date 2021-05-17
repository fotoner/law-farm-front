import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from 'styled-components';

import Home from "./routes/Home";
import SearchResult from "./routes/SearchResult";
import ArticleDetail from "./routes/ArticleDetail";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1024px;
  margin: 0 auto;
  min-height: 100vh;
  
  @media screen and (max-width: 1064px){
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
`

const App = () => {
  return (
    <Main>
      <Switch >
        <Route path="/" component={Home} exact/>
        <Route path="/result" component={SearchResult} exact/>
        <Route path="/article/@:key" component={ArticleDetail} exact />
      </Switch>
    </Main>
  );
}


export default App;
