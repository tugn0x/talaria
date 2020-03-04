/*
 *
 * Admin actions
 *
 */

import {DEFAULT_ACTION, REQUEST_SUCCESS,
   REQUEST_ERROR, STOP_LOADING, REQUEST_USERS_LIST, REQUEST_USERS_LIST_SUCCESS} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function requestUsersList() {
  return {
    type: REQUEST_USERS_LIST,
  };
}

export function requestUsersListSuccess(result) {
  return {
    type: REQUEST_USERS_LIST_SUCCESS,
    result
  };
}


export function requestSuccess() {
  return {
    type: REQUEST_SUCCESS,
  };
}

export function requestError(errorMessage) {
  return {
    type: REQUEST_ERROR,
    error: errorMessage
  };
}

export function stopLoading() {
  return {
    type: STOP_LOADING,
    // request: request
  };
}