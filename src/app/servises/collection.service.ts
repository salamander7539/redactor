import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionCount,
  collectionData,
  Firestore,
  limit,
  query,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/article.interface';

@Injectable({ providedIn: 'root' })
export class CollectionService {
  firestore = inject(Firestore);
  todosCollection = collection(this.firestore, 'datas');

  getCollection(page: number) : Observable<Article[]> {
    return collectionData(
      query(this.todosCollection, limit(page * 9)),
      {
        idField: 'id',
      }
    ) as Observable<Article[]>;
  }

  getCollectionsCount(): Observable<number> {
    collectionCount(this.todosCollection).subscribe(x => console.log('from service ' + x))
    return collectionCount(this.todosCollection);
  }
}
