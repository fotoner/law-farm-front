import { useEffect } from "react";

import { Route, Switch, useLocation } from "react-router-dom";
import styled from "styled-components";

import Header from "./components/Header";

import Home from "./routes/Home";
import ArticleDetail from "./routes/ArticleDetail";
import SearchResult from "./routes/SearchResult";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Signup from "./routes/Signup";

import useUserRecoil from "./hooks/useUserRecoil";
import useJwtExpire from "./hooks/useJwtExpire";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1024px;
  margin: 0 auto;
  min-height: 100vh;

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
`;

const App = () => {
  const location = useLocation();
  const { initUserState } = useUserRecoil();

  useJwtExpire();

  useEffect(() => {
    initUserState();
  }, [initUserState]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Main>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/logout" component={Logout} exact />
        <Route path="/signup" component={Signup} exact />
        <Route path="/result" component={SearchResult} exact />
        <Route path="/article/@:key" component={ArticleDetail} exact />
      </Switch>
    </Main>
  );
};

export default App;
