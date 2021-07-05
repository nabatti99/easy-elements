import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "remixicon/fonts/remixicon.css";
import './App.scss';

import store from "./redux/store";

import Layout from "./containers/Layout/Layout";
import Home from "./pages/Home/Home";
import Music from "./pages/Music/Music";
import Page404Error from "./pages/Page404Error/Page404Error";
import History from "./pages/History/History";

import Test from "./pages/Test/Test";

function App() {

  return (
    <BrowserRouter>
      <Provider store={ store }>

        <div>
          <Layout >
            
            <Switch>
              <Route path="/music/:id" exact component={ Music } />
              <Route path="/" exact component={ Home } />
              <Route path="/history" exact component={ History } />
              <Route path="/test" component={ Test } />
              <Route path="*" component={ Page404Error } />
            </Switch>

          </Layout>
        </div>
        
      </Provider>
    </BrowserRouter>
  );
}

export default App;
