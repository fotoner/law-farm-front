import { Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

const App = () => {
  return (
    <div>
      <Header/>
      <Route path="/" component={Main} />
    </div>
  );
}

export default App;
