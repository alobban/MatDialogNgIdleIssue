import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Keepalive } from '@ng-idle/keepalive';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

import { MessageComponent } from './message/message.component';
import { ActivityMonitorService } from './activity-monitor.service';

@Component({
  selector: 'afn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'afn-http-static ng6';
  popRef: MatDialogRef<MessageComponent>;

  status;
  idleState = 'Not started.';
  timedOut = false;
  hasIdled = false;
  lastPing?: Date = null;
  tokenExpires: any;

  constructor(
    private dialog: MatDialog,
    private idle: Idle,
    private keepalive: Keepalive,
    private amService: ActivityMonitorService
  ) {
    // Activity Monitor settings
    idle.setIdle(5); // Executes when inactive for 1 hour
    idle.setTimeout(20); // Executes a 15 minute countdown prior to Timeout
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.hasIdled = false;
      this.idleState = `No longer idle.`;
      this.status = { state: this.idleState, active: this.hasIdled };
      console.log('Act-Mon', this.status.state);
      this.popRef.close();
    });
    idle.onTimeout.subscribe(() => {
      this.idleState = `Timed out!`;
      this.timedOut = true;
      this.status = { state: this.idleState, active: false };
      this.amService.setStatus(this.status);
    });

    idle.onIdleStart.subscribe(() =>  {
      this.popRef = this.dialog.open(MessageComponent);
      this.hasIdled = true;
      this.idleState = `You've gone idle!`;
      this.tokenExpires = localStorage.getItem('expires_at');
      this.status = { state: this.idleState, active: this.hasIdled, expires: this.tokenExpires };
      // console.log(this.idleState);
      this.amService.setStatus(this.status);
    });
    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = `You will be logged out in ${countdown} seconds`;
      this.status = { state: this.idleState, active: this.hasIdled, expires: this.tokenExpires, countdown: countdown };
      // console.log(this.idleState);
      this.amService.setStatus(this.status);
    });

    keepalive.interval(30); // Executes every 30 minutes
    keepalive.onPing.subscribe(() => {
      this.lastPing = new Date();
    });

    // this.start();
  }

  public start(): void {
    console.log('started AM feature');
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
    this.status = { state: this.idleState };
    this.amService.setStatus(this.status);
  }

  public stop(): void {
    this.idle.stop();
    console.log('AM feature stopped');
  }
}
