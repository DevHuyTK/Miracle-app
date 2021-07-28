import * as types from '../constant';
const DEFAULT_START = {
  accData: [],
  loginData: {},
  dataFetched: false,
  isFetching: false,
  error: false,
  errorMessage: null,
  token: '',
  // refreshToken: '',
};
export default (state = DEFAULT_START, action) => {
  switch (action.type) {
    case types.GET_ACCOUNT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.GET_ACCOUNT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: false,
        error: false,
        errorMessage: null,
        accData: action.payload.accData,
      };
    case types.GET_ACCOUNT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMessage: action.payload.error,
      };
    case types.ADD_ACCOUNT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.ADD_ACCOUNT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: false,
        error: false,
        errorMessage: null,
        //accData:action.payload,
      };
    case types.ADD_ACCOUNT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMessage: action.payload.error,
      };
    case types.EDIT_ACCOUNT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.EDIT_ACCOUNT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: false,
        error: false,
        errorMessage: null,
        //accData:action.payload,
      };
    case types.EDIT_ACCOUNT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMessage: action.payload.error,
      };
    case types.DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataFetched: false,
        error: false,
        errorMessage: null,
        //accData:action.payload,
      };
    case types.DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMessage: action.payload.error,
      };
    case types.LOGIN_ACCOUNT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.LOGIN_ACCOUNT_SUCCESS:
      return {
        ...state,
        // token: action.payload.accessToken,
        // refreshToken: action.payload.refreshToken,
        isFetching: false,
        dataFetched: false,
        error: false,
        errorMessage: null,
        loginData: action.payload.loginData
      };
    case types.LOGIN_ACCOUNT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMessage: action.payload.error,
      };
    default:
      return state;
  }
};
