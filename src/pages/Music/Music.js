import { Component, Fragment } from "react";
import { connect } from "react-redux";

import firebaseAxios from "../../axios/firebase.axios";
import { checkMusicExistFirebase, status, putNewMusicToFirebase, generateDownloadMusicFromURL } from "../../utilities/url";
import * as actions from "../../redux/Music/actions";

import MusicHeader from "./MusicHeader/MusicHeader";
import MusicInfo from "./MusicInfor/MusicInfo";

class Music extends Component {

  state = {
    loading: true,
    error: null,


    name: "",
    playlistName: "",
    id: null,
    artist: "",
    artistId: "",
    urlCover: "",
    urlPlaylistThumb: "",
    urlPlaylistImage: "",
    relatedMusics: [],
    playlistId: null,
    music: null,
    categories: {}
  }

  getMusic = async (id) => {
    // Update to Firebase Pipeline
    return checkMusicExistFirebase(id)
    .then(isExist => { // Check the music existed in Firebase
      if (isExist)
        return {
          status: status.EXIST_IN_FIREBASE,
          message: `The music has id = ${id} has exist in firebase`
        };
      else // If no, update new music data
        return putNewMusicToFirebase(id)
          .then(response => {
          console.log(response);
          return {
            status: status.PUT_TO_FIREBASE_OK,
            message: "OK"
          }
        });
    })
    .then(response => { // Load music data to Page
      console.log(response);
      switch (response.status) {
        case status.PUT_TO_FIREBASE_OK:
        case status.EXIST_IN_FIREBASE:
          return firebaseAxios.get(`https://learning-easy-661d1.firebaseio.com/history/${id}.json`)

        default:
          throw new Error("Unknown status text");
      }
    })
    .catch(error => {
      console.error(error);
      this.setState({ loading: false, error: error });
    });
  }

  componentDidMount() {

    const { id } = this.props.match.params;
    this.setState({ loading: true, id });

    this.getMusic(id)
    .then(response => { // Sync state
      console.log(response);
      const { 
        songBaseName, MP3FilePath, albumCoverFilePath, 
        albumThumbFilePath, albumName, artistName, 
        albumId, artistId, similarSongs, 
        albumImageFilePath, categories } = response.data;

      const parsedCategories = categories.reduce((result, category) => {
        result[category.parentName] = result[category.parentName] || [];
        result[category.parentName].push(category.name);

        return result;
      }, {});
      
      const relatedMusics = JSON.parse(similarSongs)
        .map(song => {
          return {
            id: song.id,
            name: song.name,
            urlThumb: song.albumImage
          }
        });

      this.setState({
        name: songBaseName,
        playlistName: albumName,
        artist: artistName,
        artistId: artistId,
        urlCover: albumCoverFilePath,
        urlPlaylistThumb: albumThumbFilePath,
        urlPlaylistImage: albumImageFilePath,
        relatedMusics: relatedMusics,
        categories: parsedCategories,
        playlistId: albumId,
        music: MP3FilePath,

        loading: false,
        error: null
      });

      // this.props.onPlayNewMusic(this.state.id, albumThumbFilePath, songBaseName, albumName, MP3FilePath);
      // this.props.onPause();
    });
  }

  handleToggleButton = () => {
    if (this.props.isPlaying) {
      this.props.onPause();
    } else {
      this.props.onPlay();
    }
  }

  handleDownloadMusic = () => {
    generateDownloadMusicFromURL(this.state.music, `${this.state.name}.mp3`);
  }

  render () {

    const className = {
      music: "container-fluid",
      container: "row flex-column",
      header: "col-auto p-0",
      info: "col-auto p-0"
    }

    const pageContain = false && (
      <Fragment>
        <div className={ className.header }>
            <MusicHeader
              title={ this.state.name }
              artist={ this.state.artist }
              artistId={ this.state.artistId }
              bgUrl={ this.state.urlCover }
              isPlaying={ this.props.isPlaying }
              toggled={ this.handleToggleButton }
              downloaded={ this.handleDownloadMusic }
              shared={ null } />
          </div>

          <div className={ className.info }>
            <MusicInfo
              categories={ this.state.categories }
              urlImagePlaylist={ this.state.urlPlaylistImage }
              playlistId={ this.state.playlistId }
              relatedMusics={ this.state.relatedMusics } />
          </div>
      </Fragment>
    )

    return (
      <div className={ className.music }>
        <div className={ className.container }>

          { pageContain }

          <div style={{ height: "100px" }}></div>
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isPlaying: state.music.isPlaying
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPlayNewMusic: (id, thumbnail, name, playlist, music) => dispatch(actions.playNewMusic(id, thumbnail, name, playlist, music)),
    onPlay: () => dispatch(actions.playMusic()),
    onPause: () => dispatch(actions.pauseMusic())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Music);