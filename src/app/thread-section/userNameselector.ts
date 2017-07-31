

import {ApplicationState} from "../store/application-state";

export function userNameselector(state: ApplicationState): string {

  const currentUserId = state.uiState.userId,
      currentParticipant = state.storeData.participants[currentUserId];

  if (!currentParticipant) {
    return "";
  }
  return currentParticipant.name;
}
