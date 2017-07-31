import {
  ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, SimpleChanges,
  ViewChild
} from '@angular/core';
import {MessageVM} from "../message-section/message.vm";
import * as _ from 'lodash';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  // we use it to update the view when messages array mutated by the user
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MessageListComponent implements OnChanges{

  @Input()
  messages: MessageVM[];

  @ViewChild('list')
  list: ElementRef;

  constructor() { }

  // Scrolldown message list on adding a new message
  ngOnChanges(changes: SimpleChanges){
    if (changes['messages']) {
      const previouseMessages = changes['messages'].previousValue;
      const newMessages = changes['messages'].currentValue;
      if (newMessages.length && previouseMessages.length) {
        if (newMessages.length > previouseMessages.length) {
          // executes when angular finishes processing to manipulate the dom (async)
          setTimeout(() => {
            this.scrollLastMessageIntoView();
          });
        }
      }
    }
  }

  scrollLastMessageIntoView() {
    const items = this.list.nativeElement.querySelectorAll('li');
    const lastItem: any = _.last(items);
    if (lastItem) {
      lastItem.scrollIntoView();
    }
  }
}
