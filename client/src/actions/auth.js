import {
  SET_CURRENT_USER,
  REMOVE_CURRENT_USER,
  LOGIN_FAIL,
  AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "./index";
import axios from "axios";

export const login = (userParams) => async (dispatch) => {
  try {
    await dispatch({ type: AUTH_LOADING });

    const response = await axios.post("/login", userParams);

    axios.defaults.headers.common["x-auth"] = response.data.token;

    await dispatch({ type: LOGIN_SUCCESS, payload: response.data });

    await dispatch(setCurrentUser);
  } catch (error) {
    console.log(error);

    await dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await dispatch({ type: AUTH_LOADING });
    await dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {}
};
export const setCurrentUser = () => async (dispatch) => {
  try {
    await dispatch({ type: AUTH_LOADING });
    const response = await axios.get("/currentUser");
    await dispatch({ type: SET_CURRENT_USER, payload: response.data });
  } catch (error) {
    console.log(error);
    await dispatch({ type: REMOVE_CURRENT_USER });
  }
};

export const register = (userParams) => async (dispatch) => {
  try {
    await dispatch({ type: AUTH_LOADING });

    const response = await axios.post("/register", userParams);

    axios.defaults.headers.common["x-auth"] = response.data.token;

    await dispatch({ type: REGISTER_SUCCESS, payload: response.data });

    await dispatch(setCurrentUser);
  } catch (error) {
    console.log(error);

    await dispatch({ type: REGISTER_FAIL });
  }
};
