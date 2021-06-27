import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "remixicon/fonts/remixicon.css";
import './App.scss';

import store from "./redux/store";

import Layout from "./containers/Layout/Layout";
import Home from "./pages/Home/Home";
import Music from "./pages/Music/Music";
import ErrorPage from "./pages/Error/Error";

function App() {

  return (
    <BrowserRouter>
      <Provider store={ store }>

        <div>
          <Layout >
            
            <Switch>
              <Route path="/music/:id" exact component={ Music } />
              <Route path="/error" component={ ErrorPage } />
              <Route path="/" exact component={ Home } />
            </Switch>

          </Layout>
        </div>
        
      </Provider>
    </BrowserRouter>
  );
}

export default App;
