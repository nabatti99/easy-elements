import { Component } from "react";
import { connect } from "react-redux";
import artlistAxios from "../../../axios/artlist_io.axios";
// import axios from "axios";

import MusicItem from "../MusicItem/MusicItem";

import * as actions from "../../../redux/Music/actions";

/**
 * @param id Music Id (Number)
 */
class MusicController extends Component {

  state = {
    isFocus: this.props.focusId === this.props.id,
    loading: false,
    error: null,

    thumbnail: "",
    name: "",
    playlist: "",
    music: "",
    process: 20,
    genres: []
  }

  componentDidMount () {
    artlistAxios.get(`/Song/Details?ID=${ this.props.id }`)
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

  componentDidUpdate () {
    const checkFocus = this.props.focusId === this.props.id;

    if (checkFocus !== this.state.isFocus)
      this.setState({ isFocus: checkFocus });
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
        isPlaying={ this.props.isPlaying }
        process={ this.state.process }
        toggled={ this.handleToggle } />
    );
  }
}

const mapStateToProps = state => {
  return {
    isPlaying: state.music.isPlaying,
    focusId: state.music.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPlayNewMusic: (id, thumbnail, name, playlist, music) => dispatch(actions.playNewMusic(id, thumbnail, name, playlist, music)),
    onPlay: () => dispatch(actions.playMusic()),
    onPause: () => dispatch(actions.pauseMusic())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicController);