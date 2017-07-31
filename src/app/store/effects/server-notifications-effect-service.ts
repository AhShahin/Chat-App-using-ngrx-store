import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ThreadsService} from "../../services/threads.service";
import {Effect} from "@ngrx/effects";
import {NewMessageReceivedAction} from "../actions";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../application-state";


@Injectable()
export class ServerNotificationsEffectService {

  constructor(private threadService: ThreadsService, private store: Store<ApplicationState>) {}

  // refresh the user's threads evry three seconds to get new messages (polling)
  @Effect() newMessages$ = Observable.interval(3000)
    // combine two observable values (interval Observable value and store observable)
    .withLatestFrom(this.store.select("uiState"))
    // the interval Observable value combined with the uiState
    .map(([any, uiState]) => uiState)
    // pass userId to switchMap only if it exist to prevent calling loadNewMessagesForUser method with undefined parameter
    .filter((uiState: any) => uiState.userId)
    .switchMap(uiState => this.threadService.loadNewMessagesForUser(uiState.userId))
    .withLatestFrom(this.store.select("uiState"))
    .map(([unreadMessages, uiState]: [any, any]) => new NewMessageReceivedAction({
      unreadMessages:unreadMessages,
      currentThreadId: uiState.currentThreadId,
      currentUserId: uiState.currentUserId
      })
    );
}
