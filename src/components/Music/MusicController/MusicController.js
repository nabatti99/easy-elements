import { Component } from "react";
import { connect } from "react-redux";
import firebaseAxios from "../../../axios/firebase.axios";
// import axios from "axios";

import MusicItem from "../MusicItem/MusicItem";

import * as actions from "../../../redux/Music/actions";

class MusicController extends Component {

  state = {
    isFocus: this.props.focusId === this.props.id,
    loading: true,
    error: null,

    thumbnail: "",
    name: "",
    playlist: "",
    music: "",
    genres: []
  }

  componentDidMount () {
    firebaseAxios.get(`/history/${ this.props.id }.json`)
    .then(response => {
      const { genreCategories, songBaseName, MP3FilePath, albumThumbFilePath, albumName } = response.data;
      const genres = genreCategories.map(genreCategorie => genreCategorie.name);
      
      this.setState({
        loading: false,
        thumbnail: albumThumbFilePath,
        name: songBaseName,
        playlist: albumName,
        music: MP3FilePath,
        genres
      });
    })
    .catch(error => {
      console.error(error);

      this.setState({ loading: false, error: error });
    });
  }

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      isFocus: props.focusId === props.id
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    let shouldUpdate = false;

    shouldUpdate = this.state.loading || shouldUpdate;
    shouldUpdate = this.state.isFocus || shouldUpdate;

    return shouldUpdate;
  }

  componentDidUpdate () {
    console.log(this.state);
  }

  handleToggle = () => {
    if (this.state.isFocus) {
      if (this.props.isPlaying) {
        this.props.onPause();
      }
      else {
        this.props.onPlay();
      }
    } else {
      this.props.onPlayNewMusic(
        this.props.id, 
        this.state.thumbnail, 
        this.state.name, 
        this.state.playlist, 
        this.state.music
      );
    }
  }

  render () {

    return (
      <MusicItem
        thumbnail={ this.state.thumbnail }
        name={ this.state.name }
        playlist={ this.state.playlist }
        genres={ this.state.genres }
        music={ this.state.music }
        isPlaying={ this.state.isFocus ? this.props.isPlaying : false }
        process={ this.state.isFocus ? this.props.process : 0 }
        toggled={ this.handleToggle } />
    );
  }
}

const mapStateToProps = state => {
  return {
    isPlaying: state.music.isPlaying,
    focusId: state.music.id,
    process: state.music.process
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPlayNewMusic: (id, thumbnail, name, playlist, music) => dispatch(actions.playNewMusic(id, thumbnail, name, playlist, music)),
    onPlay: () => dispatch(actions.playMusic()),
    onPause: () => dispatch(actions.pauseMusic())
  }
}

/**
 * @param id Music Id (Number)
 */
export default connect(mapStateToProps, mapDispatchToProps)(MusicController);