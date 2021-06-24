import { Provider } from "react-redux";

import "remixicon/fonts/remixicon.css";
import './App.scss';

import store from "./redux/store";

import Layout from "./containers/Layout/Layout";
import Home from "./pages/Home/Home";

function App() {

  return (
    <Provider store={ store }>

      <div>
        <Layout >
          
          <Home />

        </Layout>
      </div>
      
    </Provider>
  );
}

export default App;
