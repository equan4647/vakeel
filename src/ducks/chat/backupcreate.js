/*
function* watchCreateRoomRequest(action) {
  const { payload, callback } = action;

  try {
    const response = yield call(callRequest, API_CHAT_CREATE_ROOM, payload);
    const roomInfo = response?.data ?? {};
    yield put(successCreateRoom(roomInfo));
    if (callback) {
      callback(roomInfo);
    }
  } catch (err) {
    yield put(failureCreateRoom(err.message));
    Util.showMessage(err.message);
  }
}
import { Util } from '../../utils';
*/

/*
export function requestCreateRoom(payload, callback) {
  return {
    payload,
    callback,
    type: CREATE_ROOM.REQUEST,
  };
}

export function successCreateRoom(data) {
  return {
    data,
    type: CREATE_ROOM.SUCCESS,
  };
}

export function failureCreateRoom(errorMessage) {
  return {
    errorMessage,
    type: CREATE_ROOM.FAILURE,
  };
}
*/

//export const CREATE_ROOM = createRequestTypes('CREATE_ROOM');
