import {
  GET_CURRENT_USER_NOTES,
  GET_GROUP_NOTES,
  GET_NOTES,
  NOTES_LOADING,
  CREATE_USER_NOTE_SUCCESS,
  CREATE_USER_NOTES_FAIL,
  GET_NOTE,
  EDIT_USER_NOTE_SUCCESS,
  EDIT_USER_NOTE_FAIL,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAIL,
} from "../actions";

const initialState = {
  currentUserNotes: [],
  userNotes: [],
  groupNotes: [],
  note: null,
  loading: false,
  success: false,
  message: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CURRENT_USER_NOTES:
      return {
        ...state,
        success: true,
        loading: false,
        message: "",
        currentUserNotes: payload,
      };

    case CREATE_USER_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: "Note successfully added",
        success: true,
        currentUserNotes: [payload, ...state.currentUserNotes],
      };

    case CREATE_USER_NOTES_FAIL:
      return {
        ...state,
        loading: false,
        message: "Note could not be added",
        success: false,
      };

    case GET_NOTE:
      return {
        ...state,
        loading: false,
        success: true,
        note: payload,
      };

    case EDIT_USER_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: "Note updated",
        success: true,
        currentUserNotes: state.currentUserNotes.map((currentUserNote) => {
          if (currentUserNote._id === payload._id) {
            currentUserNote = { ...currentUserNote, ...payload };
          }
          return currentUserNote;
        }),
      };

    case EDIT_USER_NOTE_FAIL:
      return {
        ...state,
        loading: false,
        message: "Note could not be updated",
        success: false,
      };

    case NOTES_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
      };
    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: "Note deleted successfully",
        currentUserNotes: state.currentUserNotes.filter(
          (currentUserNote) => currentUserNote._id !== payload._id
        ),
      };

    case DELETE_NOTE_FAIL:
      return {
        ...state,
        loading: false,
        message: "Unable to delete note",
        success: false,
      };
    default:
      return state;
  }
};
