import * as actionsType from "./types";

/**
 * @param id Number
 * @param thumbnail String
 * @param name String
 * @param playlist String
 * @param music string
 */
export const playNewMusic = (id, thumbnail, name, playlist, music, peaks) => {
  return {
    type: actionsType.PLAY_NEW_MUSIC,
    id, thumbnail, name, playlist, music, peaks
  }
}

export const playMusic = () => {
  return {
    type: actionsType.PLAY_MUSIC
  }
}

export const pauseMusic = () => {
  return {
    type: actionsType.PAUSE_MUSIC
  }
}

export const updateProcess = process => {
  return {
    type: actionsType.UPDATE_PROCESS,
    process
  }
}