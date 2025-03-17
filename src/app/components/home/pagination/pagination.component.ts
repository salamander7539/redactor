import { NgFor, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import {
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Article } from '../../../interfaces/article';
import { NumberedPaginationComponent } from "./numbered-pagination/numbered-pagination.component";
import { CollectionService } from '../../../servises/collection.service';

@Component({
  selector: 'app-pagination',
  imports: [NgFor, CommonModule, CardComponent, NumberedPaginationComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})

export class PaginationComponent implements OnInit {
  p: number = 1;
  itemsPerPage: number = 9;
  data!: string;
  private categoryService = inject(CollectionService);
  // private firestore: Firestore = inject(Firestore); 
  articles$: Observable<Article[]>;
  collectionString: Article[] = []; ///Переписать на объект

  pageEvent(pageNumber: number): void {
    this.p = pageNumber;
  }

  constructor(private firestore: Firestore) {
    
    const testCollection = collection(this.firestore, 'datas');
    
    this.articles$ = collectionData(testCollection, {
      idField: 'id',
    }) as Observable<Article[]>;

    this.articles$.subscribe(x => {
      this.collectionString = x;
    });
    
  }

  get paginatedData() {
    const start = (this.p - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    return this.collectionString.slice(start, end);
  }

  ngOnInit(): void {
    
  }

  // updateDat() {
  //   const docInstance = doc(this.firestore, 'datas', 'KYufQjZSq3bGNzM11IqT');
  //   const updateData = {
  //     description: 'I updated',
  //   };
  //   updateDoc(docInstance, updateData)
  //     .then(() => {
  //       console.log('Data Updated');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
}

interface IDs {
  id: string;
}
