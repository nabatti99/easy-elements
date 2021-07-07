import { Component, Fragment } from "react";
import { connect } from "react-redux";

import { 
  checkSFXExistFirebase, 
  status, 
  getSFXFromFirebase,
  putNewSFXToFirebase, 
  generateDownloadSFXFromURL } from "../../utilities/url";
import { playNewMusic, playMusic, pauseMusic } from "../../redux/Music/actions";
import { pushToast } from "../../redux/Toast/actions";
import * as statusText from "../../redux/Toast/statusTexts";

import SFXHeader from "./SFXHeader/SFXHeader";
import SFXInfo from "./SFXInfor/SFXInfor";
import Loading from "../../components/UI/Loading/Loading";
import SadFace from "../../components/UI/SadFace/SadFace";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

class SFX extends Component {

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
    urlPackImage: "",
    relatedSFXs: [],
    packId: null,
    sfx: null,
    categories: {}
  }

  getMusic = async (id) => {
    // Update to Firebase Pipeline
    this.setState({ message: "Checking the SFX ..." })
    return checkSFXExistFirebase(id)
    .then(response => { // Check the music existed in Firebase
      console.log(response);
      switch (response.statusText) {
        case status.EXIST_IN_FIREBASE:
          return {
            statusText: status.EXIST_IN_FIREBASE,
            message: `The SFX has id = ${id} has exist in firebase`
          };

        case status.NOT_EXIST_IN_FIREBASE:
          this.setState({ message: "Getting your SFX from Artlist.io..." })
          return putNewSFXToFirebase(id);

        default:
          console.log(response);
          throw new Error("Incorrect Status Text");
      }
    })
    .then(response => { // Load music data to Page
      console.log(response);
      this.setState({ message: "The SFX has been successfully got" });
      switch (response.statusText) {
        case status.PUT_TO_FIREBASE_OK:
        case status.EXIST_IN_FIREBASE:

          return getSFXFromFirebase(id) // Get music detail from Firebase

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
        songName, sitePlayableFilePath, albumCoverFilePath, 
        albumThumbFilePath, albumName, artistName, 
        albumId, artistId, similarSongs, 
        albumImageFilePath, grandChildCategories, peaks 
      } = response.data;

      const parsedCategories = grandChildCategories.reduce((result, category) => {
        result[category.parentName] = result[category.parentName] || [];
        result[category.parentName].push(category.name);

        return result;
      }, {});
      
      const relatedSFXs = JSON.parse(similarSongs)
        .map(song => {
          return {
            id: song.id,
            name: song.name,
            urlThumb: song.albumImage
          }
        });

      this.setState({
        name: songName,
        playlistName: albumName,
        artist: artistName,
        artistId: artistId,
        urlCover: albumCoverFilePath,
        urlPlaylistThumb: albumThumbFilePath,
        urlPackImage: albumImageFilePath,
        relatedSFXs: relatedSFXs,
        categories: parsedCategories,
        packId: albumId,
        sfx: sitePlayableFilePath,
        peaks: peaks,

        loading: false,
        error: null
      });

      this.props.onPlayNewMusic(this.state.id, albumThumbFilePath, songName, albumName, sitePlayableFilePath, peaks, true);
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

  handleDownloadSFX = () => {
    generateDownloadSFXFromURL(this.state.sfx, `${this.state.name}.aac`);
  }

  render () {

    const className = {
      sfx: "container-fluid",
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
        pageContain = <SadFace 
          iconSize={1} 
          faceColor="gray" 
          textColor="gray" >{ this.state.error }</SadFace>;
      else
        pageContain = (
          <Fragment>
            <div className={ className.header }>
                <SFXHeader
                  title={ this.state.name }
                  artist={ this.state.artist }
                  artistId={ this.state.artistId }
                  bgUrl={ this.state.urlCover }
                  isPlaying={ this.props.isPlaying }
                  toggled={ this.handleToggleButton }
                  downloaded={ this.handleDownloadSFX }
                  shared={ null } />
              </div>
    
              <div className={ className.info }>
                <SFXInfo
                  categories={ this.state.categories }
                  urlImagePack={ this.state.urlPackImage }
                  packId={ this.state.packId }
                  relatedSFXs={ this.state.relatedSFXs } />
              </div>
          </Fragment>
        )
    }

    return (
      <ErrorBoundary>
        <div className={ className.sfx }>
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
    onPlayNewMusic: (id, thumbnail, name, playlist, music, peaks, isSFX) => dispatch(playNewMusic(id, thumbnail, name, playlist, music, peaks, isSFX)),
    onPlay: () => dispatch(playMusic()),
    onPause: () => dispatch(pauseMusic()),
    onPushToast: (header, subHeader, content, statusText) => dispatch(pushToast(header, subHeader, content, statusText))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SFX);