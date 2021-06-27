import { Component } from "react";

import Header from "./HomeHeader/HomeHeader";
import History from "./HomeHistory/HomeHistory";

class Home extends Component {

  render () {

    const className = {
      home: "container-fluid",
      container: "row flex-column",
      header: "col-auto p-0 mt-5",
      history: "col-auto p-0"
    }

    return (
      <div className={ className.home }>
        <div className={ className.container }>

          <div className={ className.header }>
            <Header />
          </div>

          <div className={ className.history }>
            <History />
          </div>
          
        </div>
      </div>
    );
  }
}

export default Home;