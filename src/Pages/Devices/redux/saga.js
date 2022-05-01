// vendor
import { call, all, take, put } from "redux-saga/effects";

//proj
import { fetchAPI } from "utils";

// own
import { FETCH_DEVICES, setDevices } from "./duck";

export function* fetchDevicesSaga() {
  while (true) {
    try {
      yield take(FETCH_DEVICES);
      // yield put(setUserFetching(true));

      try {
        const response = yield call(fetchAPI, "GET", "/getAllDevices", {
          page: 1,
        });

        yield put(setDevices(response));

        console.log("response: ", response);
      } catch (error) {
        console.error(error);
      } finally {
        // yield put(setUserFetching(false));
      }
    } catch (error) {
      console.log("Error while log in: ", error);
    }
  }
}

export function* saga() {
  yield all([call(fetchDevicesSaga)]);
}
