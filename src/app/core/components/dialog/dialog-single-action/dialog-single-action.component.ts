import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-single-action',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isVisible" class="modal modal-open">
      <div class="modal-box">
        <h3 class="text-lg font-bold">{{ title }}</h3>
        <p class="py-4">{{ message }}</p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn" (click)="close()">{{ button }}</button>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class DialogSingleActionComponent {
  @Input() modalId: string = '';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() button: string = 'Ok';
  @Input() isVisible: boolean = false;

  close() {
    this.isVisible = false;
  }
}
