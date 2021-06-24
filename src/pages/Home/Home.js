import { Component } from "react";

import Header from "./Header/Header";
import History from "./History/History";

class Home extends Component {

  render () {

    const className = {
      home: "container",
      container: "row flex-column",
      header: "col-auto mt-5",
      history: "col-auto"
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