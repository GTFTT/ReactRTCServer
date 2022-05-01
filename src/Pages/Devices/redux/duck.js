import {
  createDeviceService,
  getDeviceByIdService,
  getDeviceParametersService,
  updateDeviceService,
} from "./services";

/** Constants **/
export const moduleName = "devices";
const prefix = `pages/${moduleName}`;

export const FETCH_DEVICES = `${prefix}/FETCH_DEVICES`;
export const SET_DEVICES = `${prefix}/SET_DEVICES`;
export const SET_DEVICE_PARAMETERS = `${prefix}/SET_DEVICE_PARAMETERS`;
export const SET_DEVICE_BY_ID = `${prefix}/SET_DEVICE_BY_ID`;
export const SET_DEVICES_LOADING = `${prefix}/SET_DEVICES_LOADING`;
export const CREATE_DEVICE = `${prefix}/CREATE_DEVICE`;
export const UPDATE_DEVICE = `${prefix}/UPDATE_DEVICE`;

/** Reducer **/
const ReducerState = {
  devices: [],
  editDevice: null,
  loading: false,
  deviceParameters: [],
};

export default function reducer(state = ReducerState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_DEVICES:
      return {
        ...state,
        devices: payload,
      };

    case SET_DEVICE_PARAMETERS:
      return {
        ...state,
        deviceParameters: payload,
      };

    case SET_DEVICE_BY_ID:
      return {
        ...state,
        editDevice: payload,
      };

    case SET_DEVICES_LOADING:
      return {
        ...state,
        loading: payload,
      };

    case CREATE_DEVICE:
      return {
        ...state,
        devices: [...state.devices, payload],
        loading: false,
      };

    case UPDATE_DEVICE: {
      const devicesList = [...state.devices];
      const updateIndex = devicesList.findIndex(
        (device) => device.id === payload.id
      );
      if (updateIndex >= 0) {
        devicesList.splice(updateIndex, 1, payload);
      }
      return { ...state, devices: devicesList, loading: false };
    }

    default:
      return state;
  }
}

/** Selectors **/
export const selectDevices = (state) => state[moduleName].devices;
export const selectEditDevice = (state) => state[moduleName].editDevice;
export const selectDeviceParameters = (state) =>
  state[moduleName].deviceParameters;
export const selectDevicesLoading = (state) => state[moduleName].loading;

/** Action Creators **/
export const fetchDevices = () => ({
  type: FETCH_DEVICES,
});

export const setDevices = (payload) => ({
  type: SET_DEVICES,
  payload,
});

export const setDeviceParameters = (payload) => ({
  type: SET_DEVICE_PARAMETERS,
  payload,
});

export const setDeviceById = (payload) => ({
  type: SET_DEVICE_BY_ID,
  payload,
});

export const setDevicesLoading = (payload) => ({
  type: SET_DEVICES_LOADING,
  payload,
});

export const getDeviceByIdAction = (id) => {
  return (dispatch) => {
    dispatch(setDevicesLoading(true));
    Promise.all([
      getDeviceByIdService(id).then((res) => {
        dispatch(setDeviceById(res));
      }),
      getDeviceParametersService(id).then((res) => {
        dispatch(setDeviceParameters(res.dataList));
      }),
    ])
      .then(() => {
        dispatch(setDevicesLoading(false));
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };
};

export const createDeviceAction = (data, handleClose) => {
  return (dispatch) => {
    dispatch(setDevicesLoading(true));
    createDeviceService(data)
      .then(() => {
        dispatch(setDevicesLoading(false));
        dispatch(fetchDevices());
        handleClose();
      })
      .catch((err) => {
        dispatch(setDevicesLoading(false));
        console.log(err?.message);
      });
  };
};

export const updateDeviceAction = (data, id, handleClose) => {
  return (dispatch) => {
    dispatch(setDevicesLoading(true));
    updateDeviceService(id, data)
      .then(() => {
        dispatch(setDevicesLoading(true));
        dispatch(fetchDevices());
        dispatch(getDeviceByIdAction(id));
        handleClose();
      })
      .catch((err) => {
        dispatch(setDevicesLoading(false));
        console.log(err?.message);
      });
  };
};
