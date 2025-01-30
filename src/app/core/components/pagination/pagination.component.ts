import { Component, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pagination',
  template: `
    <div class="join">
      <button
        class="btn join-item"
        *ngFor="let page of pageNumbers"
        [class.btn-active]="page === currentPage"
        (click)="onPageChange(page)">
        {{ page }}
      </button>
    </div>
  `,
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;

  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  private itemsPerPage: number = environment.itemPerPage;

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }
}
