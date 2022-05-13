/**
 * This duck file reexports all reducers of lover levels
 */

// vendor
import { combineReducers } from "redux";

//own
import userReducer, { moduleName as userModule } from "./user/duck";

export const mainModuleName = "common";

//Reexports from other ducks(required to access their content):
export * from "./user/duck";

//Export this reducer in the way we can connect other reducers
export default combineReducers({
  [userModule]: userReducer,
});
