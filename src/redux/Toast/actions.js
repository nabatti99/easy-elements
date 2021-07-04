import * as actionsType from "./types";

export const pushToast = (header, subHeader, content, statusText) => {
  return {
    type: actionsType.PUSH_TOAST,
    header, subHeader, content, statusText
  }
}

export const popToast = () => {
  return {
    type: actionsType.POP_TOAST
  }
}