import { call, put, takeLatest } from 'redux-saga/effects';

import { failureSearchKeyword, successSearchKeyword } from './actions';
import { callRequest } from '../../utils/ApiSauce';
import { SearchUtil } from '../../DataUtils';
import { SEARCH_KEYWORD } from './types';

function* watchSearchKeywordRequest(action) {
  const { identifier, payload, callback } = action;
  try {
    const url = SearchUtil.getAutoSuggestUrl(identifier);
    const payloadAutoSuggest = SearchUtil.getAutoSuggestPayload(
      identifier,
      payload
    );
    const response = yield call(callRequest, url, payloadAutoSuggest);
    const autoSuggestData = SearchUtil.getAutoSuggestData(identifier, response);

    /*
    { keyword }
    */
    if (callback) {
      callback(autoSuggestData, true);
    }
    yield put(successSearchKeyword(autoSuggestData, identifier));
  } catch (err) {
    yield put(failureSearchKeyword(err.message, identifier));
    if (callback) {
      callback(err.message, false);
    }
  }
}

export default function* root() {
  yield takeLatest(SEARCH_KEYWORD.REQUEST, watchSearchKeywordRequest);
}
