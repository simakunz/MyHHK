import { MessageService } from './message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessagesComponent implements OnInit {

  // The messageService property must be public because you're about to bind to it in the template.
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
