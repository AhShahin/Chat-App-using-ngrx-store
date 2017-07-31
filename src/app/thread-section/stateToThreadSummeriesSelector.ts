import {ApplicationState} from "../store/application-state";
import {Thread} from "../../../shared/model/thread";
import {ThreadSummaryVM} from "./thread-summary.vm";
import * as _ from "lodash";
import {buildThreadParticipantsList} from "../shared/mapping/buildThreadParticipantsList";
declare var require: any;

const deepFreez = require('deep-freeze-strict');

export function stateToThreadSummeriesSelector(state: ApplicationState): ThreadSummaryVM[] {

  // converting threads map to an array
  const threads = _.values<Thread>(state.storeData.threads);

  // converting threads array to ThreadSummaryVM type
  // using deepFreeze to make the VM immutable
  return deepFreez(threads.map(_.partial(mapThreadToThreadSummary, state)));
}

function mapThreadToThreadSummary(state: ApplicationState, thread: Thread): ThreadSummaryVM {

  const lastMessageId = _.last(thread.messageIds),
    lastMessage = state.storeData.messages[lastMessageId];

  return {
    id: thread.id,
    participantNames: buildThreadParticipantsList(state, thread),
    lastMessageText: lastMessage.text,
    timestamp: lastMessage.timestamp,
    read: thread.id === state.uiState.currentThreadId || thread.participants[state.uiState.userId] === 0
  }
}
