import {uiState} from "./uiStateReducer";
import {storeData} from "./uiStoreDataReducer";
import {Action, combineReducers} from "@ngrx/store";
import {ApplicationState} from "../application-state";
import {storeFreeze} from "ngrx-store-freeze";
import {compose} from "@ngrx/core/compose";
import {routerReducer} from "@ngrx/router-store";


const reducers = {
  uiState: uiState,
  storeData: storeData,
  router: routerReducer
};

//compose storeFreeze to prevent the mutation of the app state inside the reducer
const combinedReducer = compose(storeFreeze,combineReducers)(reducers);

export function storeReducer(state: ApplicationState, action: Action) {
  return combinedReducer(state, action);
}
