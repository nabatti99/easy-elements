const { Component } = require("react");

class ErrorPage extends Component {

  render () {

    const className = {
      error: "container-fluid",
      container: "row flex-column"
    }

    return (
      <div className={ className.music }>
        <div className={ className.container }>

          <div className="col-auto">
            Error Page
          </div>
          
        </div>
      </div>
    );
  }
}

export default ErrorPage;