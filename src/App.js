import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "remixicon/fonts/remixicon.css";
import './App.scss';

import store from "./redux/store";

import asyncComponent from "./components/AsyncComponent/AsyncComponent";
import Layout from "./containers/Layout/Layout";
import Home from "./pages/Home/Home";

const Music = asyncComponent(() => import("./pages/Music/Music"));
const SFX = asyncComponent(() => import("./pages/SFX/SFX"));
const Page404Error = asyncComponent(() => import("./pages/Page404Error/Page404Error"));
const History = asyncComponent(() => import("./pages/History/History"));

const Test = asyncComponent(() => import("./pages/Test/Test"));

function App() {

  return (
    <BrowserRouter>
      <Provider store={ store }>

        <div>
          <Layout >
            
            <Switch>
              <Route path="/music/:id" exact render={(props) => <Music {...props} />} />
              <Route path="/sfx/:id" exact render={(props) => <SFX {...props} />} />
              <Route path="/history" exact render={(props) => <History {...props} />} />
              <Route path="/" exact render={(props) => <Home {...props} />} />
              <Route path="/test" exact render={(props) => <Test {...props} />} />
              <Route path="*" render={(props) => <Page404Error {...props} />} />
            </Switch>

          </Layout>
        </div>
        
      </Provider>
    </BrowserRouter>
  );
}

export default App;
