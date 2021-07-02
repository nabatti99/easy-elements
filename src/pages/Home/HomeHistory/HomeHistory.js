import { Component, Fragment } from "react";

import { getTopNewMusics } from "../../../utilities/url";

import Logo from "../../../assets/images/logo.png";
import classes from "./HomeHistory.module.scss";
import MusicList from "../../../components/Music/MusicList/MusicList";

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
      console.log(error);
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

    return (
      <Fragment>
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

        <div className={ className.footer }>
          <div className={ className.container }>
            <div className="row flex-column py-5">
              <div className="col-auto">
                <img src={ Logo } height={40} />
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
      </Fragment>
    );
  }
}

export default History