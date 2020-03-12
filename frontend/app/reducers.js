/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import  { persitanceReducer } from './persistence';
import authProviderReducer from 'containers/Auth/AuthProvider/reducer';
import patronReducer from 'containers/Patron/reducer';
import adminReducer from 'containers/Admin/reducer';
import libraryReducer from 'containers/Library/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),
    persistence: persitanceReducer,
    auth: authProviderReducer,
    patron: patronReducer,
    admin: adminReducer,
    library: libraryReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
