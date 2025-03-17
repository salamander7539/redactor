import { inject, Injectable } from "@angular/core";
import { collection, collectionData, Firestore } from "@angular/fire/firestore";
import { map, Observable } from "rxjs";
import { Article } from "../interfaces/article";

@Injectable({ providedIn: 'root' })
export class CollectionService {
    firestore = inject(Firestore);
    todosCollection = collection(this.firestore, 'datas');
  
    getCollecttions(): Observable<Article[]> {
      return collectionData(this.todosCollection, {
        idField: 'id',
      }) as Observable<Article[]>;
    }
}