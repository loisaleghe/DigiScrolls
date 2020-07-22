import axios from "axios";
import {
  NOTES_LOADING,
  GET_CURRENT_USER_NOTES,
  CREATE_USER_NOTE_SUCCESS,
  CREATE_USER_NOTES_FAIL,
  GET_NOTE,
  EDIT_USER_NOTE_SUCCESS,
  EDIT_USER_NOTE_FAIL,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAIL,
} from ".";

export const getCurrentUserNote = () => async (dispatch) => {
  try {
    await dispatch({ type: NOTES_LOADING });
    const response = await axios.get("/notes/current/author");
    await dispatch({ type: GET_CURRENT_USER_NOTES, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const createUserNote = (noteParams) => async (dispatch) => {
  try {
    await dispatch({ type: NOTES_LOADING });
    const response = await axios.post(`/notes`, noteParams);
    await dispatch({ type: CREATE_USER_NOTE_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    await dispatch({ type: CREATE_USER_NOTES_FAIL });
  }
};

export const getNote = (noteId) => async (dispatch) => {
  try {
    await dispatch({ type: NOTES_LOADING });
    const response = await axios.get(`/notes/${noteId}`);
    await dispatch({ type: GET_NOTE, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const updateNote = (noteId, noteParams) => async (dispatch) => {
  try {
    await dispatch({ type: NOTES_LOADING });
    const response = await axios.put(`/notes/${noteId}`, noteParams);
    await dispatch({ type: EDIT_USER_NOTE_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    await dispatch({ type: EDIT_USER_NOTE_FAIL });
  }
};

export const deleteNote = (noteId) => async (dispatch) => {
  try {
    await dispatch({ type: NOTES_LOADING });
    const response = await axios.delete(`/notes/${noteId}`);
    await dispatch({ type: DELETE_NOTE_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    await dispatch({ type: DELETE_NOTE_FAIL });
  }
};
