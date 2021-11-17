import { useEffect } from "react";

import { Route, Switch, useLocation } from "react-router-dom";
import styled from "styled-components";
import { TransitionGroup } from "react-transition-group";

import Header from "./components/header/Header";
import TransitionWrapper from "./components/TransitionWrapper";

import Home from "./routes/Home";
import ArticleList from "./routes/ArticleList";
import ArticleDetail from "./routes/ArticleDetail";
import SearchResult from "./routes/SearchResult";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Signup from "./routes/Signup";
import UserPage from "./routes/UserPage";
import MyPage from "./routes/MyPage";
import Bookmark from "./routes/Bookmark";
import Logs from "./routes/Logs";
import Recommends from "./routes/Recommends";
import ForumList from "./routes/ForumList";
import ForumWrite from "./routes/ForumWrite";
import ForumDetail from "./routes/ForumDetail";
import NotFound from "./routes/NotFound";



import useUserRecoil from "./hooks/auth/useUserRecoil";
import useJwtExpire from "./hooks/auth/useJwtExpire";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1024px;
  margin: 0 auto;
  min-height: 100vh;

  @media screen and (max-width: 1064px) {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
`;

const routeList = [
  { path: "/", name: "home", Component: Home },
  { path: "/login", name: "login", Component: Login },
  { path: "/logout", name: "logout", Component: Logout },
  { path: "/signup", name: "signup", Component: Signup },
  { path: "/mypage", name: "mypage", Component: MyPage },
  { path: "/userpage/@:userId", name: "userpage", Component: UserPage },
  { path: "/bookmark", name: "bookmark", Component: Bookmark },
  { path: "/logs", name: "logs", Component: Logs },
  { path: "/result", name: "result", Component: SearchResult },
  { path: "/article", name: "articleList", Component: ArticleList },
  { path: "/article/@:key", name: "articleDetail", Component: ArticleDetail },
  { path: "/forum", name: "forumList", Component: ForumList },
  { path: "/forum/write", name: "forumWrite", Component: ForumWrite },
  { path: "/forum/@:key", name: "forumDetail", Component: ForumDetail },
  { path: "/recommends", name: "recommends", Component: Recommends },
];

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
      <TransitionGroup className="route-transition-group">
        <Switch>
          {routeList.map(({ path, name, Component }) => (
            <Route key={name} exact path={path}>
              {({ match }) => (
                <TransitionWrapper match={match}>
                  <Component />
                </TransitionWrapper>
              )}
            </Route>
          ))}
          <Route>
            {({ match }) => (
              <TransitionWrapper match={match}>
                <NotFound />
              </TransitionWrapper>
            )}
          </Route>
        </Switch>
      </TransitionGroup>
    </Main>
  );
};

export default App;
