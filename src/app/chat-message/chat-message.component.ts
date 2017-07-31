import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {MessageVM} from "../message-section/message.vm";

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent {

  @Input()
  message: MessageVM;

  constructor() {
  }

}
