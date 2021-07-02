import * as actionsType from "./types";

const initialState = {
  id: null,
  thumbnail: "",
  name: "",
  playlist: "",

  isPlaying: false,
  process: 0,
  music: null,
  peaks: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.PLAY_NEW_MUSIC:
      return {
        ...state,
        music: action.music,
        peaks: action.peaks,
        id: action.id,
        thumbnail: action.thumbnail,
        name: action.name,
        playlist: action.playlist,
        isPlaying: true,
        
        process: 0
      }

    case actionsType.PLAY_MUSIC:
      return {
        ...state,
        isPlaying: true
      }

    case actionsType.PAUSE_MUSIC:
      return {
        ...state,
        isPlaying: false
      }

    case actionsType.UPDATE_PROCESS:
      return {
        ...state,
        process: action.process
      }

    default:
      return state;
  }
}

export default reducer;