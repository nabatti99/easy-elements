import * as actionsType from "./types";
import * as statusTexts from "./statusTexts";

const initialState = {
  latestToast: null,
  toasts: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.PUSH_TOAST:

      const newToast = {
        id: Math.round(Math.random()*1000),
        header: action.header,
        subHeader: action.subHeader,
        content: action.content,
        statusText: action.statusText
      }

      return {
        latestToast: newToast,
        toasts: [...state.toasts, newToast]
      }

    case actionsType.POP_TOAST:
      const updatedToasts = state.toasts.slice(0, -1)
      const latestToast = updatedToasts.length > 0 ? updatedToasts[updatedToasts.length - 1] : null;

      return {
        latestToast: latestToast,
        toasts: updatedToasts
      };

    default:
      return state;
  }
}

export default reducer;