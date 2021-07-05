import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { getIdFromUrl } from "../../utilities/url";
import { pushToast } from "../../redux/Toast/actions";
import * as statusText from "../../redux/Toast/statusTexts";

const withUrlController = Searchbar => {
  class WithUrlController extends Component {

    state = {
      url: "",
      id: null
    }

    handleChangeUrl = (event) => {
      this.setState({ url: event.target.value });
    }

    handleSearch = (event) => {
      event.preventDefault();

      try {
        const id = getIdFromUrl(this.state.url);

        this.props.history.push(`/music/${id}`);
      } catch (error) {
        this.props.onPushToast(
          "URL Error", 
          "", 
          <div>
            <p>{ error.message }</p>
            <p>The correct URL is having <span className="text-primary">"https://artlist.io/"</span> origin name!</p>
          </div>, 
          statusText.ERROR
        )
      }
    }
  
    render () {

      return <Searchbar 
        { ...this.props }
        value={ this.state.url } 
        changed={ this.handleChangeUrl } 
        submitted={ this.handleSearch } />
    }
  }

  return connect(null, mapDispatchToState)(withRouter(WithUrlController));
}

const mapDispatchToState = dispatch => {
  return {
    onPushToast: (header, subHeader, content, statusText) => dispatch( pushToast(header, subHeader, content, statusText) )
  }
}

export default (withUrlController);