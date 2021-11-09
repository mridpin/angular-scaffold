import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationPanelComponent } from './notification-panel/notification-panel.component';



@NgModule({
  declarations: [
    NotificationPanelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NotificationPanelComponent
  ]
})
export class SharedComponentsModule { }
