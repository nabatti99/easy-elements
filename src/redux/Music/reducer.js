import * as actionsType from "./types";

const initialState = {
  id: null,
  thumbnail: "",
  name: "",
  playlist: "",

  isPlaying: false,
  // process: 20,
  music: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.PLAY_NEW_MUSIC:
      return {
        ...state,
        music: action.music,
        id: action.id,
        thumbnail: action.thumbnail,
        name: action.name,
        playlist: action.playlist,
        isPlaying: true
      }

    case actionsType.PLAY_MUSIC:
      return {
        ...state,
        // process: 20,
        isPlaying: true
      }

    case actionsType.PAUSE_MUSIC:
      return {
        ...state,
        // process: 20,
        isPlaying: false
      }

    default:
      return state;
  }
}

export default reducer;