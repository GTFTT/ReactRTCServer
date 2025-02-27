// vendor
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import { default as persistStorage } from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import { LOCATION_CHANGE } from 'connected-react-router';
import _ from 'lodash';

// proj
import CommonReducer, {mainModuleName as commonModule} from 'Common/redux/duck';
import DevicesReducer, {moduleName as devicesModule} from 'Pages/Devices/redux/duck';
import DeviceParameterReducer, {moduleName as deviceParameterModule} from 'Modals/DeviceParameterModal/redux/duck';
import SmartPlugReducer, {moduleName as smartPlugModule} from 'Pages/SmartPlugControl/redux/duck';
import SignUpReducer, {moduleName as signUpModule} from 'Pages/SignUp/redux/duck';
import LogInReducer, {moduleName as logInModule} from 'Pages/LogIn/redux/duck';

// own
import history from './history';

/**
 * Persisted storage is saved even if page was reloaded
 */
export const persistConfig = {
    key:       'persistedStore',
    storage:   persistStorage,
    whitelist: [
        commonModule,
    ],
};

/** Persisted state will no change after reloading of the page */
const persistedState = {
    'router':         connectRouter(history),
    [ commonModule ]: CommonReducer,
};

/** There should be placed object that have storage that will be dropped after reload */
const appState = {
    [ deviceParameterModule ]: DeviceParameterReducer,
    [ smartPlugModule ]:       SmartPlugReducer,
    [ devicesModule ]:         DevicesReducer,
    [ signUpModule ]:          SignUpReducer,
    [ logInModule ]:           LogInReducer,
};

const appReducer = combineReducers({ ...persistedState, ...appState });

const reducer = (state, action) => {
    const { type, payload } = action;
    let resetedState = null;

    // Reset redux store when we visit new page
    // TODO add redux duck and saga for location change
    if (
        type === LOCATION_CHANGE &&
        _.get(payload, 'location.pathname') !==
            _.get(state, 'router.location.pathname')
    ) {
        resetedState = Object.keys(persistedState).reduce(
            (resetedState, moduleName) => {
                resetedState[ moduleName ] = state[ moduleName ];

                return resetedState;
            },
            {},
        );
    }

    return appReducer(resetedState || state, action);
};

const rootReducer = persistReducer(persistConfig, (state, action) => {
    return reducer(state, action);
});

export default rootReducer;
