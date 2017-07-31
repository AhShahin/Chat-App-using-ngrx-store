import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../store/application-state";
import { ThreadSelectedAction } from "../store/actions";
import {Observable} from "rxjs/Observable";
import {ThreadSummaryVM} from "./thread-summary.vm";
import {userNameselector} from "./userNameselector";
import {mapStateTounreadMessagesCounter} from "./mapStateTounreadMessagesCounter";
import * as _ from "lodash";
import {stateToThreadSummeriesSelector} from "./stateToThreadSummeriesSelector";
import {UiState} from "../store/ui-state";

@Component({
  selector: 'app-thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})

export class ThreadSectionComponent {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;

  uiState: UiState;

  constructor(private store: Store<ApplicationState>) {

    this.userName$ = store.select(userNameselector);
    this.unreadMessagesCounter$ = store.map(mapStateTounreadMessagesCounter);
    this.threadSummaries$ = store.select(stateToThreadSummeriesSelector);

    store.select(state => state.uiState).subscribe(uiState => this.uiState = _.cloneDeep(uiState));
  }

  onThreadSelected(selectedThreadId: number){
    this.store.dispatch(new ThreadSelectedAction({currentUserId: this.uiState.userId, selectedThreadId}));
  }
}
