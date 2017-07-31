import {ApplicationState} from "../store/application-state";
import {MessageVM} from "./message.vm";
import {Message} from "../../../shared/model/message";
import * as _ from 'lodash';
import {Participant} from "../../../shared/model/participant";
import { createSelector } from 'reselect';


// createSelector will rerender the ui only if participants or messages have been changed and the outcome will be
// mapMessagesToMessagesVM, this a pure function implements memoization (results stored in the cache)
export const messagesSelector = createSelector(getParticipants, getMessagesForCurrentThread, mapMessagesToMessagesVM);



function getMessagesForCurrentThread(state: ApplicationState): Message[] {
  const currentThread = state.storeData.threads[state.uiState.currentThreadId];
  // if the messageIds array is empty map will return an empty array
  return currentThread? currentThread.messageIds.map(messageId => state.storeData.messages[messageId]):
    [];
}

function getParticipants(state: ApplicationState) {
  return state.storeData.participants;
}

function mapMessagesToMessagesVM(participants: {[key: number]: Participant}, messages:Message[]){
  return messages.map(message=> {
    const participantName = participants[message.participantId].name;
    return mapMessageToMessageVM(participantName, message)
  });
}

// a memoize version so it calculates messages if there is a new message otherwise it returns the cached version
const mapMessageToMessageVM = _.memoize((participantName: string, message:Message): MessageVM => {
  return {
    id: message.id,
    text: message.text,
    timestamp: message.timestamp,
    participantName: participantName
  };
},
    // memoize key of the cache by default is the first parameter
    // here we specify a combination two parameters in case participantName has changed
    (participantName: string, message:Message) => message.id + participantName
);
