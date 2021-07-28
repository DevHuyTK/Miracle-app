import * as types from '../constant';

export function getAllAccounts(payload) {
  return {
    type: types.GET_ACCOUNT_REQUEST,
    payload,
  };
}
export function registerAccount(payload) {
  return {
    type: types.ADD_ACCOUNT_REQUEST,
    payload,
  };
}
export function editAccount(payload) {
  return {
    type: types.EDIT_ACCOUNT_REQUEST,
    payload,
  };
}
export function deleteAccount(payload) {
  return {
    type: types.DELETE_ACCOUNT_REQUEST,
    payload,
  };
}
export function adminDeleteAccount(payload) {
  return {
    type: types.ADMIN_DELETE_ACCOUNT_REQUEST,
    payload,
  };
}
export function singInAccount(payload) {
  return {
    type: types.LOGIN_ACCOUNT_REQUEST,
    payload,
  };
}
