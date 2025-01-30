import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-two-action',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isVisible" class="modal modal-open">
      <div class="modal-box">
        <h3 class="text-lg font-bold">{{ title }}</h3>
        <p class="py-4">{{ message }}</p>
        <div class="modal-action">
          <form method="dialog" class="flex gap-2">
            <button class="btn" (click)="continue()">{{ button1 }}</button>
            <button class="btn btn-error" (click)="close()">{{ button2 }}</button>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class DialogTwoActionComponent {
  @Input() modalId: string = '';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() button1: string = 'Ok';
  @Input() button2: string = 'Close';
  @Input() isVisible: boolean = false;

  @Output() isContinue = new EventEmitter<boolean>();
  @Output() isVisibleChange = new EventEmitter<boolean>();

  continue() {
    this.isContinue.emit(true);
  }

  close() {
    this.isVisibleChange.emit(false); 
  }
}
