import { Injectable } from '@angular/core';
import {ThreadsService} from "../../services/threads.service";
import {Actions, Effect} from "@ngrx/effects";
import {LOAD_USER_THREADS_ACTION, LoadUserThreadsAction, SELECT_USER_ACTION, UserThreadsLoadedAction} from "../actions";
import "rxjs/add/operator/switchMap";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";

@Injectable()
export class LoadThreadsEffectsService {

  constructor(private actions$: Actions, private threadsService: ThreadsService) {

  }

  @Effect() userThreads$: Observable<Action> = this.actions$
                  .ofType(LOAD_USER_THREADS_ACTION)
                  .debug("action received")
                  .switchMap(action => this.threadsService.loadUserThread(action.payload))
                  .map(allUserData => new UserThreadsLoadedAction(allUserData));

  @Effect() newUserSelected$: Observable<Action> = this.actions$
                   .ofType(SELECT_USER_ACTION)
                   .debug("New user selected")
                    // it will call the above effect
                   .map(action => new LoadUserThreadsAction(action.payload));
}
