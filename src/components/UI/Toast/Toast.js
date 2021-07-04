import { Component } from "react";
import { connect } from "react-redux";

import { popToast } from "../../../redux/Toast/actions";
import * as statusTexts from "../../../redux/Toast/statusTexts";

import classes from "./Toast.module.scss";

class Toast extends Component {

  colorDictionary = {
    [statusTexts.ERROR]: "bg-danger",
    [statusTexts.INFO]: "bg-primary",
    [statusTexts.SUCCESS]: "bg-success"
  }

  toastTimeoutId = null

  componentDidUpdate () {
    
    if (!this.props.id) {
      console.log("Close");
      this.toastTimeoutId = null;
      return;
    }

    if (this.toastTimeoutId) {
      clearTimeout(this.toastTimeoutId);
    }

    this.toastTimeoutId = setTimeout(() => {
      this.closeToast();
    }, 5000);
  }

  closeToast = () => {
    this.props.onPopToast();
  }

  handleClickClickButton = () => {
    clearTimeout(this.state.toastId);
    this.closeToast();
  }

  render () {

    const className = {
      toast: `toast bg-glass border-0 ${classes.Toast} ${ this.props.id ? "show" : "" }`,
      header: "toast-header bg-transparent",
      colorStatus: `${this.colorDictionary[this.props.statusText]} p-2 rounded me-2`
    }

    return (
      <div className={ className.toast } role="alert">
        <div className={ className.header }>
          <div className={ className.colorStatus } />
          <strong className="me-auto">{ this.props.header }</strong>
          <small>{ this.props.subHeader }</small>
          <button type="button" className="btn-close" onClick={ this.handleClickClickButton } ></button>
        </div>
        <div className="toast-body">
          { this.props.content }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {

  const toast = state.toast.latestToast || {};

  return {
    id: toast.id,
    header: toast.header,
    subHeader: toast.subHeader,
    content: toast.content,
    statusText: toast.statusText,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPopToast: () => dispatch( popToast() ),
  }
}

/**
 * @param header String
 * @param subHeader String
 * @param content React Element (children)
 * @param statusText Toast Status Text
 */
export default connect(mapStateToProps, mapDispatchToProps)(Toast);