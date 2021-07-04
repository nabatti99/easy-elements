import { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import Modal from "../UI/Modal/Modal";

class ErrorBoundary extends Component {

  state = {
    showModal: false,
    title: null,
    content: null,
    button: null
  }

  static getDerivedStateFromError (error) {
    return { 
      showModal: true,
      title: "Showing error...", 
      content: "Showing error...",
      button: "Waiting a second"
    }
  }

  intervalId = null;

  componentDidCatch (error, errorInfo) {
    this.setState({ 
      title: error, 
      content: errorInfo,
      button: "Reload after 3s..."
    });

    let count = 3;

    this.intervalId = setInterval((count) => {
      if(count === 0) {
        clearInterval(this.intervalId);
        this.setState({
          button: `Reloading...`
        });
        this.reloadPage();
      }

      this.setState({
        button: `Reload after ${--count}s...`
      })
    }, 1000, count);
  }

  reloadPage = () => {
    clearInterval(this.intervalId);
    this.props.history.go(0);
  }

  handleClicked = () => {
    this.reloadPage();
  }

  render () {
    return (
      <Fragment>
        <Modal 
          title={ this.state.title }
          disabledCloseButton
          buttonMessage={ this.state.button }
          clickedCloseButton={ null }
          clicked={ this.handleClicked }>
            <p>{ this.state.content }</p>
        </Modal>
        { this.props.children }
      </Fragment>
    );
  }
}

export default withRouter(ErrorBoundary);