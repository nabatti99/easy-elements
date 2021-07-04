import { Component, Fragment } from "react";
import { connect } from "react-redux";

import { getTopNewMusics } from "../../../utilities/url";

import classes from "./HomeHistory.module.scss";
import MusicList from "../../../components/Music/MusicList/MusicList";

import { pushToast } from "../../../redux/Toast/actions";
import * as statusText from "../../../redux/Toast/statusTexts";

class History extends Component {

  state = {
    loading: true,
    idsList: null,
    error: null
  }

  componentDidMount () {
    getTopNewMusics(5)
    .then(response => {
      console.log(response);

      this.setState({ loading: false, idsList: response.data });
    })
    .catch(error => {
      this.props.onPushToast(
        error.message, null, 
        "Please check your network and try to reload this page.", 
        statusText.ERROR
      );

      this.setState({ error: error.message });
    })
  }

  render () {

    const className = {
      background: classes.Background,
      container: `container`,
      history: `row flex-column position-absolute`,
      title: "fw-bold text-dark text-center ls-95 mb-3",
      subTitle: "text-gray text-center",
      linkArea: "text-center text-gray",
      link: "text-decoration-none",

      footer: "bg-light",
      linkFooter: "text-gray mt-3 m-0"
    }

    return !this.state.error
      ? (
        <div className={ className.background }>
          <div className={ className.container }>
            <div className="col-auto mb-5">
              <h2 className={ className.title }>History</h2>
              <p className={ className.subTitle }>Find the musics that has been get by the experienced user</p>
            </div>

            <div className="col-auto">
              { !this.state.loading && <MusicList idsList={ this.state.idsList } /> }
            </div>

            <div className="col-auto py-5">
              <p className={ className.linkArea }>
                Continue at&nbsp;
                <a className={ className.link } href="/history">Histories</a>&nbsp;
                sections...</p>
            </div>
          </div>
        </div>
      )
      : (
        <div className="container py-5 text-center text-gray-light">
          <h1><i className="ri-emotion-sad-line"></i></h1>
          <h2 className="fw-bold ls-95">{ this.state.error }</h2>
        </div>
      )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPushToast: (header, subHeader, content, statusText) => dispatch(pushToast(header, subHeader, content, statusText))
  }
}

export default connect(null, mapDispatchToProps)(History);