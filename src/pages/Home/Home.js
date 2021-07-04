import { Component } from "react";

import Logo from "../../assets/images/logo.png";
import Header from "./HomeHeader/HomeHeader";
import History from "./HomeHistory/HomeHistory";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

class Home extends Component {

  render () {

    const className = {
      home: "container-fluid",
      container: "row flex-column",
      header: "col-auto p-0 mt-5",
      history: "col-auto p-0",
      footer: "bg-light",
      linkFooter: "text-gray mt-3 m-0",
      link: "text-decoration-none",
    }

    return (
      <ErrorBoundary>
        <div className={ className.home }>
          <div className={ className.container }>

            <div className={ className.header }>
              <Header />
            </div>

            <div className={ className.history }>
              <History />
            </div>

            <div className={ className.footer }>
              <div className="container">
                <div className="row flex-column py-5">
                  <div className="col-auto">
                    <img src={ Logo } height={40} alt="Logo" />
                  </div>
                  <div className="col-auto">
                    <p className={ className.linkFooter }>
                      Made by Minh from&nbsp;
                      <a className={ className.link } href="https://www.facebook.com/HUGOClub">Hugo English Club</a>&nbsp;.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default Home;