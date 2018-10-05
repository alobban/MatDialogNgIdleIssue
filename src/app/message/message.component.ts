import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ActivityMonitorService } from '../activity-monitor.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'afn-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {

  status: any;
  getAMStatusSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<MessageComponent>,
    private amService: ActivityMonitorService
  ) { }

  ngOnInit() {
    this.getAMStatusSubscription = this.amService.getAMData$.subscribe(status => {
      console.log('inside message', status);
      this.status = status;
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.getAMStatusSubscription.unsubscribe();
  }

}
