import {
  SET_CURRENT_USER,
  REMOVE_CURRENT_USER,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_LOADING,
  LOGOUT_SUCCESS,
  RESET_AUTH_STATE,
} from "../actions";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  success: false,
  message: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER: {
      return {
        ...state,
        isAuthenticated: true,
        success: true,
        loading: false,
        message: "",
        user: payload,
      };
    }
    case REMOVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: false,
        success: true,
        loading: false,
        message: "",
        user: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("x-auth", payload.token);
      return {
        ...state,
        user: payload,
        success: true,
        isAuthenticated: true,
        loading: false,
        message: "Login Successful",
      };
    case LOGIN_FAIL:
      localStorage.removeItem("x-auth");
      return {
        ...state,
        user: null,
        success: false,
        isAuthenticated: false,
        loading: false,
        message: payload,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("x-auth", payload.token);
      return {
        ...state,
        user: payload,
        success: true,
        isAuthenticated: true,
        loading: false,
        message: "Registration Successful",
      };

    case REGISTER_FAIL:
      localStorage.removeItem("x-auth");
      return {
        ...state,
        user: null,
        success: false,
        isAuthenticated: false,
        loading: false,
        message: payload,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("x-auth");
      return {
        ...state,
        user: null,
        success: true,
        isAuthenticated: false,
        loading: false,
        message: "Logout Successful",
      };

    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
      };

    case RESET_AUTH_STATE:
      return {
        ...state,
        loading: false,
        message: "",
        success: false,
      };
    default:
      return state;
  }
};
