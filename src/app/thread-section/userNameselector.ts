

import {ApplicationState} from "../store/application-state";

export function userNameselector(state: ApplicationState): string {

  if (!state.uiState.userId) {
    return "";
  }
  return state.storeData.participants[state.uiState.userId].name;
}
