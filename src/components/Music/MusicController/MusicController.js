import { Component } from "react";
import { connect } from "react-redux";
import firebaseAxios from "../../../axios/firebase.axios";
import axios from "axios";
// import axios from "axios";

import MusicItem from "../MusicItem/MusicItem";
import Loading from "../../UI/Loading/Loading";
import SadFace from "../../UI/SadFace/SadFace";

import { playNewMusic, playMusic, pauseMusic } from "../../../redux/Music/actions";
import { pushToast } from "../../../redux/Toast/actions";
import { generateDownloadMusicFromURL } from "../../../utilities/url";

class MusicController extends Component {

  state = {
    isFocus: this.props.focusId === this.props.id,
    loading: true,
    error: null,

    thumbnail: "",
    name: "",
    playlist: "",
    music: "",
    genres: [],
    peaks: []
  }

  componentDidMount () {
    firebaseAxios.get(`/history/${ this.props.id }.json`)
    .then(response => {

      if (response.data === null)
        throw new Error("Can't get this song now");

      const { genreCategories, songBaseName, MP3FilePath, albumThumbFilePath, albumName, waveSurferFilePath } = response.data;
      const genres = genreCategories.map(genreCategorie => genreCategorie.name);

      return axios.get(waveSurferFilePath)
      .then(response => {
        this.setState({
          loading: false,
          error: null,
          
          thumbnail: albumThumbFilePath,
          name: songBaseName,
          playlist: albumName,
          music: MP3FilePath,
          genres,
          peaks: response.data
        });
      })
    })
    .catch(error => {
      console.error(error);
      pushToast(
        "Can't play music now",
        "Music controller",
        <div>
          <p>Unexpected error in the Music Controller</p>
          <p>Detail: { error.message }</p>
          <p><i>If you see that error again. Please contact Minh for more information</i></p>
        </div>
      )
      this.setState({ loading: false, error: error.message });
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
        this.state.music,
        this.state.peaks
      );
    }
  }

  handleDownloadMusic = () => {
    generateDownloadMusicFromURL(this.state.music, `${this.state.name}.mp3`);
  }

  render () {

    let mainContain = null;

    if (this.state.loading)
      mainContain = (
        <div className="py-5 p-0">
          <Loading loadingColor="gray"textColor="gray" />
        </div> 
      );
    else {
      if (this.state.error)
        mainContain = (
          <div className="py-4 p-0">
            <SadFace 
              faceColor="gray-light" 
              textColor="gray-light"
              iconSize="3">Couldn't load this song</SadFace>
          </div>
        );
      else
        mainContain = (
          <MusicItem
            id={ this.props.id }
            thumbnail={ this.state.thumbnail }
            name={ this.state.name }
            playlist={ this.state.playlist }
            genres={ this.state.genres }
            music={ this.state.music }
            peaks={ this.state.peaks }
            isPlaying={ this.state.isFocus ? this.props.isPlaying : false }
            process={ this.state.isFocus ? this.props.process : 0 }
            toggled={ this.handleToggle }
            downloaded={ this.handleDownloadMusic } />
        );
    }

    return mainContain;
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
    onPlayNewMusic: (id, thumbnail, name, playlist, music, peaks) => dispatch(playNewMusic(id, thumbnail, name, playlist, music, peaks)),
    onPlay: () => dispatch(playMusic()),
    onPause: () => dispatch(pauseMusic()),
    onPushToast: (header, subHeader, content, statusText) => dispatch(pushToast(header, subHeader, content, statusText))
  }
}

/**
 * @param id Music Id (Number)
 */
export default connect(mapStateToProps, mapDispatchToProps)(MusicController);