import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ThreadSummaryVM} from "../thread-section/thread-summary.vm";

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css'],
  // we use it to update the view when messages array mutated by the user
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreadListComponent implements OnInit {

  @Input()
  threads: ThreadSummaryVM[];

  @Input()
  currentSelectedThreadId: number;

  @Output()
  threadSelected = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectThread(threadId: number) {
    this.threadSelected.next(threadId);
  }



}
