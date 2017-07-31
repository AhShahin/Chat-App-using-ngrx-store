import { Injectable } from '@angular/core';
import {ThreadsService} from "../../services/threads.service";
import {Actions, Effect} from "@ngrx/effects";
import {THREAD_SELECTED_ACTION, ThreadSelectedAction} from "../actions";
import "rxjs/add/operator/switchMap";

@Injectable()
export class markMessagesAsReadEffectService {

  constructor(private actions$: Actions, private threadsService: ThreadsService) {

  }
  // since we aren't dispatching a new action we add false
  @Effect({dispatch:false}) markMessagesAsRead$ = this.actions$.ofType(THREAD_SELECTED_ACTION)
    .switchMap((action: ThreadSelectedAction) =>
      this.threadsService.markMessagesAsRead(
        action.payload.currentUserId,
        action.payload.selectedThreadId
    ));

}
