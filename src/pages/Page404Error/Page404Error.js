import { Component } from "react";

import classes from "./Page404Error.module.scss";

class Page404Error extends Component {

  render () {

    const className = {
      error: `container-fluid ${classes.Container}`,
      container: "row flex-column justify-content-center h-100",
      title: "text-center text-gray ls-95 fw-semi-bold mb-4",
      subtitle: "text-center text-gray-light",
      icon: "text-center text-gray ls-95 fw-semi-bold"
    }

    return (
      <div className={ className.error }>
        <div className={ className.container }>

          <div className="col-auto">
            <h1 className={ className.title }>
              <i className="ri-find-replace-line"></i>
            </h1>
          </div>

          <div className="col-auto mb-5">
            <h2 className={ className.title }>Oh no! This page does not exist</h2>
            <p className={ className.subtitle }>Sorry, I can't find the page you are looking for</p>
          </div>
          
        </div>
      </div>
    );
  }
}

export default Page404Error;