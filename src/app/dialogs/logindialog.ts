import {Component, inject} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

@Component({
  selector: 'dialog-login',
  template: `
    <h2 mat-dialog-title>Login</h2>
    <mat-dialog-content>
      <div class="flex flex-col">
        <mat-form-field>
          <mat-label>Username</mat-label>
          <input matInput [(ngModel)]="data.username" />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Password</mat-label>
          <input matInput [(ngModel)]="data.password" />
        </mat-form-field>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="cancel()">Cancel</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Login</button>
    </mat-dialog-actions>
  `,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ]
})
export class LoginDialog {
  readonly dialogRef = inject(MatDialogRef<LoginDialog>);
  readonly data = inject<LoginDialogData>(MAT_DIALOG_DATA);

  cancel(): void {
    this.dialogRef.close();
  }
}

export interface LoginDialogData {
  username: string;
  password: string;
}
