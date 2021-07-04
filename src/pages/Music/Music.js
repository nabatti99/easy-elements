import { Component, Fragment } from "react";
import { connect } from "react-redux";

import { 
  checkMusicExistFirebase, 
  status, 
  getMusicFromFirebase,
  putNewMusicToFirebase, 
  generateDownloadMusicFromURL,
  createTimestamp } from "../../utilities/url";
import { playNewMusic, playMusic, pauseMusic } from "../../redux/Music/actions";
import { pushToast } from "../../redux/Toast/actions";
import * as statusText from "../../redux/Toast/statusTexts";

import MusicHeader from "./MusicHeader/MusicHeader";
import MusicInfo from "./MusicInfor/MusicInfo";
import Loading from "../../components/UI/Loading/Loading";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

class Music extends Component {

  state = {
    loading: true,
    error: null,
    message: "Initiating...",


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
    this.setState({ message: "Checking the music ..." })
    return checkMusicExistFirebase(id)
    .then(response => { // Check the music existed in Firebase
      console.log(response);
      switch (response.statusText) {
        case status.EXIST_IN_FIREBASE:
          return {
            statusText: status.EXIST_IN_FIREBASE,
            message: `The music has id = ${id} has exist in firebase`
          };

        case status.NOT_EXIST_IN_FIREBASE:
          this.setState({ message: "Getting your music from Artlist.io..." })
          return putNewMusicToFirebase(id);

        default:
          console.log(response);
          throw new Error("Incorrect Status Text");
      }
    })
    .then(response => { // Load music data to Page
      console.log(response);
      this.setState({ message: "The music has been successfully got" });
      switch (response.statusText) {
        case status.PUT_TO_FIREBASE_OK:
        case status.EXIST_IN_FIREBASE:

          createTimestamp(id);
          return getMusicFromFirebase(id) // Get music detail from Firebase

        default:
          throw new Error("Unknown status text");
      }
    });
  }

  loadPage = () => {
    const { id } = this.props.match.params;

    if (isNaN(id)) {
      this.props.history.replace("/404-Not-Found");
      return;
    }

    this.setState({ loading: true, id });

    this.getMusic(id)
    .then(response => { // Sync state
      console.log(response);
      const { 
        songBaseName, MP3FilePath, albumCoverFilePath, 
        albumThumbFilePath, albumName, artistName, 
        albumId, artistId, similarSongs, 
        albumImageFilePath, categories, peaks 
      } = response.data;

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
        peaks: peaks,

        loading: false,
        error: null
      });

      this.props.onPlayNewMusic(this.state.id, albumThumbFilePath, songBaseName, albumName, MP3FilePath, peaks);
      this.props.onPause();
    })
    .catch(error => {
      this.setState({ loading: false, error: error.message, message: "Oops, something went wrong!" });
      this.props.onPushToast(
        error.message, "", 
        <div>
          <p>Oops, something went wrong!</p>
          <p>Please <span className="text-danger">check your Network</span> and try to <span className="text-danger">reload</span> this page.</p>
          <i>If the error is still there, contact Minh for more information.</i>
        </div>, 
        statusText.ERROR
      )
    });
  }

  componentDidMount() {
    this.loadPage();
  }

  componentDidUpdate() {

    if (this.state.id === this.props.match.params.id)
      return;

    this.loadPage();
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

    let pageContain = null

    if (this.state.loading) {
      pageContain = (
        <div className="mt-5 pt-5">
          <Loading 
            loadingColor="dark"
            textColor="dark" >{ this.state.message }</Loading>
        </div>
      );
    } else {
      if (this.state.error)
        pageContain = (
          <div className="container py-5 text-center text-gray-light">
            <h1><i className="ri-emotion-sad-line"></i></h1>
            <h2 className="fw-bold ls-95">{ this.state.error }</h2>
          </div>
        );
      else
        pageContain = (
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
    }

    return (
      <ErrorBoundary>
        <div className={ className.music }>
          <div className={ className.container }>

            { pageContain }
            
          </div>
        </div>
      </ErrorBoundary>
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
    onPlayNewMusic: (id, thumbnail, name, playlist, music, peaks) => dispatch(playNewMusic(id, thumbnail, name, playlist, music, peaks)),
    onPlay: () => dispatch(playMusic()),
    onPause: () => dispatch(pauseMusic()),
    onPushToast: (header, subHeader, content, statusText) => dispatch(pushToast(header, subHeader, content, statusText))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Music);