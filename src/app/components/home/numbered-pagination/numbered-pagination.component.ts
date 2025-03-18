import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NumberedPagination } from '../../../interfaces/pagination.interface';
import { allowNavigation, ruler } from '../../../constants/ruler.constant';

@Component({
  selector: 'app-numbered-pagination',
  imports: [],
  templateUrl: './numbered-pagination.component.html',
  styleUrl: './numbered-pagination.component.scss',
  standalone: true,
})
export class NumberedPaginationComponent implements OnInit {
  maxPages: number = 0;

  @Input() index: any = 1;
  @Input() pageSize: any;
  @Input() totalCount: any;
  @Input() rulerLength: number = 3;

  @Output() page: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {
    console.log("pageSize " + this.pageSize);
    console.log("totalCount " + this.totalCount);
    this.maxPages = Math.ceil(this.totalCount / this.pageSize);
  }

  get pagination(): NumberedPagination {
    const { index, maxPages, rulerLength } = this;
    const pages = ruler(index, maxPages, rulerLength);
    return { index, maxPages, pages } as NumberedPagination;
  }

  navigateToPage(pageNumber: number): void {
    if (allowNavigation(pageNumber, this.index, this.maxPages)) {
      this.index = pageNumber;
      this.page.emit(this.index);
    }
  }

  trackByFn(index: number): number {
    return index;
  }
}