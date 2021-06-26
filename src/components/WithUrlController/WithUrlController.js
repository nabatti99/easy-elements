import { Component } from "react";
import firebaseAxios from "../../axios/firebase.axios";
import artlistAxios from "../../axios/artlist_io.axios";

import { getIdFromUrl, checkMusicExistFirebase, putNewMusicToFirebase, status } from "../../utilities/url";

const withUrlController = Searchbar => {
  return class WithUrlController extends Component {

    state = {
      url: "",
      loading: false,
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

      this.setState({ loading: true });

      // Update to Firebase Pipeline
      checkMusicExistFirebase(id)
      .then(isExist => { // Check the music existed in Firebase
        if (isExist)
          return {
            status: status.EXIST_IN_FIREBASE,
            message: `The music has id = ${id} has exist in firebase`
          };
        else // If no, fetch new music data
          return putNewMusicToFirebase(id)
            .then(response => {
            console.log(response);
            return {
              status: status.OK,
              message: "OK"
            }
          });
      })
      .then(response => {
        console.log(response);
        switch (response.status) {
          case status.OK:
            break;

          case status.EXIST_IN_FIREBASE:

            break;

          default:
            throw new Error("Unknown status text");
        }

        this.setState({ loading: true, error: null });
      })
      .catch(error => {
        console.error(error);

        this.setState({ loading: false, error: error });
      });
    }
  
    render () {

      return <Searchbar 
        { ...this.props }
        value={ this.state.url } 
        changed={ this.handleChangeUrl } 
        submitted={ this.handleSearch } />
    }
  }
}

export default withUrlController;