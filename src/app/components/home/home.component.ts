import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, TrackByFunction } from '@angular/core';
import { CardComponent } from './card/card.component';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Article } from '../../interfaces/article.interface';
import { NumberedPaginationComponent } from './numbered-pagination/numbered-pagination.component';
import { CollectionService } from '../../servises/collection.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CardComponent, NumberedPaginationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
   page: number = 1;
    itemsPerPage: number = 9;
  
    private categoryService = inject(CollectionService);
    articleCountObservable$: Observable<number> =
      this.categoryService.getCollectionsCount();
    articles$: Observable<Article[]> = this.categoryService.getCollection(
      this.page
    );
    collectionString: Article[] = [];
  
    start: number = 0;
    articlesCount = 0;
    end: number = this.start + this.itemsPerPage;
  
    constructor(private route: ActivatedRoute) {}
  
    ngOnInit(): void {
      this.articles$.subscribe((data) => (this.collectionString = data));
      this.articleCountObservable$.subscribe(
        (count) => (this.articlesCount = count)
      );
    }
    
    pageEvent(pageNumber: number): void {
      this.page = pageNumber;
      this.articles$ = this.categoryService.getCollection(this.page);
      this.articles$.subscribe((data) => {
        this.collectionString = data;
      });
  
      this.start = (this.page - 1) * this.itemsPerPage;
      this.end = this.start + this.itemsPerPage;
      console.log(this.start, '');
    }
  
    public trackByFn(index: number, article: Article) {
      index
      return article.id;
    }
}
