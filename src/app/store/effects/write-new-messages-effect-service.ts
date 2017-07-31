import {Injectable} from "@angular/core";
import {ThreadsService} from "../../services/threads.service";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";
import {ErrorOccurredAction, SEND_NEW_MESSAGE_ACTION} from "../actions";

@Injectable()
export class WriteNewMessageEffectService {

  constructor(private actions$: Actions, private threadService: ThreadsService) {

  }

  @Effect() newMessages$: Observable<any> = this.actions$
    .ofType(SEND_NEW_MESSAGE_ACTION)
    // saveNewMessage needs to return an observable
    .switchMap(action => this.threadService.saveNewMessage(action.payload))
    // of operator allows us to create an observable of all sorts of input
    // in this case we will create an Observable that emits an action
    .catch(() => Observable.of(new ErrorOccurredAction('Error Ocurred while saving message')));
}
