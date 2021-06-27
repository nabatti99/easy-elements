import { Component } from "react";
import { withRouter } from "react-router";

import { getIdFromUrl, checkMusicExistFirebase, putNewMusicToFirebase, status } from "../../utilities/url";

const withUrlController = Searchbar => {
  class WithUrlController extends Component {

    state = {
      url: "",
      id: null,
      error: null
    }

    handleChangeUrl = (event) => {
      this.setState({ url: event.target.value });
    }

    handleSearch = (event) => {
      event.preventDefault();

      const id = getIdFromUrl(this.state.url);

      if (id instanceof Error) {
        this.setState({ error: id });
        return;
      }

      this.props.history.push(`/music/${id}`);
    }
  
    render () {

      return <Searchbar 
        { ...this.props }
        value={ this.state.url } 
        changed={ this.handleChangeUrl } 
        submitted={ this.handleSearch } />
    }
  }

  return withRouter(WithUrlController);
}

export default withUrlController;