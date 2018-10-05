To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
# MatDialogNgIdleIssue

There is an issue I have discovered with Ng-Idle, Material 6 nad Angular 6

    "@ng-idle/core": "^6.0.0-beta.3"
    "@ng-idle/keepalive": "^6.0.0-beta.3"
    "@angular/core": "^6.1.9"
    "@angular/cdk": "^6.4.7"
    "@angular/material": "^6.4.7"
    
## What is the issue?
When ng-idle executes `onIdleEnd` the currently displayed `mat-dialog` isn't closing when invoked. See lines `37 - 43` in `app.component.ts` file.

[See my Stackblitz](https://stackblitz.com/github/alobban/MatDialogNgIdleIssue)
