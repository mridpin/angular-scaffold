import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.css']
})
export class NotificationPanelComponent implements OnInit {

  @Input() text: string;
  @Output() event = new EventEmitter<string>();

  constructor() {
    this.text = '';
  }

  ngOnInit(): void {
  }

  close(): void {
    this.event.emit('');
  }

}
