

import {Action} from "@ngrx/store";
import {AllUserData} from "../../../shared/to/all-user-data";
import {Message} from "../../../shared/model/message";

export const USER_THREADS_LOADED_ACTION = 'USER_THREADS_LOADED_ACTION';
export const LOAD_USER_THREADS_ACTION = 'LOAD_USER_THREADS_ACTION';
export const THREAD_SELECTED_ACTION = 'THREAD_SELECTED_ACTION';
export const SELECT_USER_ACTION = 'SELECT_USER_ACTION';
export const SEND_NEW_MESSAGE_ACTION = 'SEND_NEW_MESSAGE_ACTION';
export const NEW_MESSAGE_RECEiVED_ACTION = 'NEW_MESSAGE_RECEiVED_ACTION';
export const ERROR_OCCURRED_ACTION = 'ERROR_OCCURRED_ACTION';

export class LoadUserThreadsAction implements Action {

  readonly type: string = LOAD_USER_THREADS_ACTION;

  constructor(public payload:number) {

  }
}

export class UserThreadsLoadedAction implements Action {

  readonly type: string = USER_THREADS_LOADED_ACTION;

  constructor(public payload?: AllUserData) {

  }
}

export interface ThreadSelectedActionPayload {
  selectedThreadId: number;
  currentUserId: number;
}

export class ThreadSelectedAction implements Action {

  readonly type: string = THREAD_SELECTED_ACTION;

  constructor(public payload?: ThreadSelectedActionPayload) {

  }
}

export class SelectUserAction implements Action {

  readonly type: string = SELECT_USER_ACTION;

  constructor(public payload?: number) {

  }
}

export interface SendNewMessageActionPayload {
  text:string;
  threadId: number;
  participantId: number
}

export class SendNewMessageAction implements Action {

  readonly type: string = SEND_NEW_MESSAGE_ACTION;

  constructor(public payload?: SendNewMessageActionPayload) {

  }
}

export interface NewMessageReceivedActionPayload {
  unreadMessages: Message[];
  currentThreadId: number;
  currentUserId: number;
}

export class NewMessageReceivedAction implements Action {

  readonly type: string = NEW_MESSAGE_RECEiVED_ACTION;

  constructor(public payload?: NewMessageReceivedActionPayload) {

  }
}

export class ErrorOccurredAction implements Action {

  readonly type: string = ERROR_OCCURRED_ACTION;

  constructor(public payload?: string) {

  }
}
