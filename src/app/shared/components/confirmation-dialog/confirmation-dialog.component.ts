import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {

  @Input() confirmed = new EventEmitter<boolean>();

  onComfirm() {
    this.confirmed.emit(true);
  }
  onCancle() {
    this.confirmed.emit(false);
  }
}
