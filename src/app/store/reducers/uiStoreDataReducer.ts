
import {StoreData} from "../store-data";
import {
  NEW_MESSAGE_RECEiVED_ACTION, NewMessageReceivedAction,
  SEND_NEW_MESSAGE_ACTION, SendNewMessageAction, THREAD_SELECTED_ACTION, ThreadSelectedAction,
  USER_THREADS_LOADED_ACTION,
  UserThreadsLoadedAction
} from "../actions";
import * as _ from 'lodash';
import {Message} from "../../../../shared/model/message";

declare var require: any;

const uuid = require('uuid/V4');

export function storeData(state: StoreData, action): StoreData{
  switch (action.type){
    case USER_THREADS_LOADED_ACTION:
      return handleLoadUserThreadsAction(state, action);

    case SEND_NEW_MESSAGE_ACTION:
      return handleSendNewMessageAction(state, action);

    case NEW_MESSAGE_RECEiVED_ACTION:
      return handleNewMessageReceivedAction(state, action);

    case THREAD_SELECTED_ACTION:
      return handleThreadSelectedAction(state, action);

    default:
      return state;
  }
}

function handleLoadUserThreadsAction(state: StoreData,
                                     action: UserThreadsLoadedAction): StoreData {
  return  {
    participants: _.keyBy(action.payload.participants, 'id'),
    messages: _.keyBy(action.payload.messages, 'id'),
    threads: _.keyBy(action.payload.threads, 'id')
  };
}

function handleSendNewMessageAction(state: StoreData, action: SendNewMessageAction) {

  // using cloneDeep for copying the object properties if they are objects
  //const newStoreState = _.cloneDeep(state);

  // since the state has no nested objects, we will use shallow copy
  const newStoreState: StoreData= {
    participants: state.participants,
    // shallow copy (a new object reference that points to the current object)
    // because we are not gonna mutate the whole map but just one thread
    threads: Object.assign({}, state.threads),
    messages: Object.assign({}, state.messages)
  };

  // shallow copy of the previous version of the current thread to mutate the message ids array because both of then are frozen
  newStoreState.threads[action.payload.threadId] = Object.assign({}, state.threads[action.payload.threadId]);
  // then assign the copy to a variable
  const currentThread = newStoreState.threads[action.payload.threadId];

  const newMessage: Message = {
      text: action.payload.text,
      threadId: action.payload.threadId,
      timestamp: new Date().getTime(),
      participantId: action.payload.participantId,
      id: uuid()
  };

  // linking the thread to the messages
  // then copy the message ids array into new array
  // because it's still pointing to a previously existing frozen array because it's immutable
  currentThread.messageIds = currentThread.messageIds.slice(0);
  // then push the new message id into it
  currentThread.messageIds.push(newMessage.id);

  // save the message by using the newStoreState instead of using state to prevent mutating the store state directly
  newStoreState.messages[newMessage.id] = newMessage;

  return newStoreState;
}

function handleNewMessageReceivedAction(state: StoreData, action: NewMessageReceivedAction){

  // clone the state to prevent the mutation of the state (works in conjunction with storeFreez)
  //const newStoreState = _.cloneDeep(state);

  // shallow copy because state is frozen (mutable)
  const newStoreState: StoreData= {
    participants: state.participants,
    // shallow copy (a new object reference that points to the current object)
    threads: _.clone(state.threads),
    messages: _.clone(state.messages)
  };

  const newMessages = action.payload.unreadMessages,
        currentThreadId = action.payload.currentThreadId,
        currentUserId = action.payload.currentUserId;

  newMessages.forEach(message => {
      newStoreState.messages[message.id] = message;

      // shallow copy of the current thread to mutate the message ids array because both of then are frozen
      newStoreState.threads[message.threadId] = _.clone(state.threads[message.threadId]);
      // then assign the copy to a variable from the original frozen array
      const messageThread = newStoreState.threads[message.threadId];
      // then copy the message ids array into new array
      // because it's frozen (immutable)
      messageThread.messageIds = _.clone(messageThread.messageIds);
      // then push the new message id into it
      messageThread.messageIds.push(message.id);

    if (message.threadId !== currentThreadId) {
          messageThread.participants = _.clone(newStoreState.threads[message.threadId].participants);
          messageThread.participants[currentUserId] += 1;
      }
  });

  return newStoreState;
}

function handleThreadSelectedAction(state: StoreData, action: ThreadSelectedAction) {

  //const newStoreState = _.cloneDeep(state);

  // shallow copy because state is frozen (mutable)
  const newStoreState: StoreData= {
    participants: state.participants,
    // shallow copy (a new object reference that points to the current object)
    threads: _.clone(state.threads),
    messages: _.clone(state.messages)
  };

  // shallow copy the selected thread
  newStoreState.threads[action.payload.selectedThreadId] = _.clone(state.threads[action.payload.selectedThreadId]);
  // assign it to a variable
  const currentThread = newStoreState.threads[action.payload.selectedThreadId];
  // shallow copy the thread's participants
  currentThread.participants = _.clone(currentThread.participants);
  // mutate it
  currentThread.participants[action.payload.currentUserId] = 0;

  return newStoreState;

}
