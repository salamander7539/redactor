import { NgFor, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-numbered-pagination',
  imports: [NgFor, NgIf],
  templateUrl: './numbered-pagination.component.html',
  styleUrl: './numbered-pagination.component.scss',
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

const ruler = (
  currentIndex: number,
  maxPages: number,
  rulerLength: number
): number[] => {
  const array = new Array(rulerLength).fill(null);
  const min = Math.floor(rulerLength / 2);

  return array.map((_, index) =>
    rulerFactory(currentIndex, index, min, maxPages, rulerLength)
  );
};

const rulerOption = (
  currentIndex: number,
  min: number,
  maxPages: number
): RulerFactoryOption => {
  return currentIndex <= min
    ? RulerFactoryOption.Start
    : currentIndex >= maxPages - min
    ? RulerFactoryOption.End
    : RulerFactoryOption.Default;
};

const rulerFactory = (
  currentIndex: number,
  index: number,
  min: number,
  maxPages: number,
  rulerLength: number
): number => {
  const factory = {
    [RulerFactoryOption.Start]: () => index + 1,
    [RulerFactoryOption.End]: () => maxPages - rulerLength + index + 1,
    [RulerFactoryOption.Default]: () => currentIndex + index - min,
  };

  return factory[rulerOption(currentIndex, min, maxPages)]();
};

const allowNavigation = (
  pageNumber: number,
  index: number,
  maxPages: number
): boolean => {
  return pageNumber !== index && pageNumber > 0 && pageNumber <= maxPages;
};

enum RulerFactoryOption {
  Start = 'START',
  End = 'END',
  Default = 'DEFAULT',
}

interface NumberedPagination {
  index: number;
  maxPages: number;
  pages: number[];
}
