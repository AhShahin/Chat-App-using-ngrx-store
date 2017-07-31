import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {ApplicationState} from "../store/application-state";
import {UiState} from "../store/ui-state";

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css']
})
export class ErrorMessagesComponent implements OnInit {

  message: string;

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.store.select("uiState").subscribe((uiState:UiState) => this.message = uiState.currentError);
  }

  close() {
    this.message = '';
  }

}
