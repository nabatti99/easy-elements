import { Component } from "react";
import { connect } from "react-redux";
import { parseTime, parseProcess } from "../../../utilities/music";

import MusicFloating from "../MusicFloating/MusicFloating";

import * as actions from "../../../redux/Music/actions";

class MusicFloatingController extends Component {

  constructor (props) {
    super(props);

    console.log("init");
  }

  audio = new Audio();

  state = {
    loadingAudio: false,
    duration: "00:00",
    currentTime: "00:00",
    process: 0
  }

  componentDidMount () {
    console.log("attach event");
    this.audio.onloadeddata = this.handleLoadedAudioData;
    this.audio.onloadstart = this.handleLoadStartAudioData;
    this.audio.ondurationchange = this.handleDurationChange;
    this.audio.ontimeupdate = this.handleTimeUpdate;
  }

  handleLoadStartAudioData = () => {
    console.log("load start");
    this.setState({ loadingAudio: true, process: 0 });
  }

  handleLoadedAudioData = () => {
    console.log("loadded");
    this.setState({ loadingAudio: false, process: 0 })
  }

  handleDurationChange = () => {
    this.setState({ duration: parseTime(this.audio.duration) });
  }

  handleTimeUpdate = () => {

    const process = parseProcess(this.audio.currentTime, this.audio.duration);

    this.setState({
      currentTime: parseTime(this.audio.currentTime),
      process
    });

    this.props.onUpdateProcess(process);
  }

  componentDidUpdate () {
    console.log("did update");
    console.log(this.state);

    if (this.props.isPlaying === this.audio.paused)
      if (this.props.isPlaying)
        this.audio.play();
      else
        this.audio.pause();

    // load new music
    if (!this.state.loadingAudio && this.audio.src !== this.props.music) {

      console.log("audio update");
      this.audio.src = this.props.music;

      console.log("load and play audio");
      this.audio.play()
      .then(response => {
        console.log("played");
        console.log(response);
      });

    }
  }

  handleToggle = () => {
    if (this.props.isPlaying) {
      this.audio.pause()
      this.props.onPause();
    } else {
      this.audio.play()
      this.props.onPlay();
    }
  }

  render () {

    console.log("render");
    console.log(this.audio);

    return (
      this.props.id && <MusicFloating
        thumbnail={ this.props.thumbnail }
        timer={ `${this.state.currentTime}/${this.state.duration}` }
        name={ this.props.name }
        playlist={ this.props.playlist }
        music={ this.props.music }
        isPlaying={ this.props.isPlaying }
        process={ this.state.process }
        toggled={ this.handleToggle } />
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.music.id,
    thumbnail: state.music.thumbnail,
    name: state.music.name,
    playlist: state.music.playlist,
  
    isPlaying: state.music.isPlaying,
    music: state.music.music
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPlay: () => dispatch(actions.playMusic()),
    onPause: () => dispatch(actions.pauseMusic()),
    onUpdateProcess: process => dispatch(actions.updateProcess(process))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicFloatingController);