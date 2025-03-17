import { Timestamp } from "@angular/fire/firestore";

export interface Article {
    id: string;
    name: string;
    date: Timestamp;
    imageUrl: string;
    description: string;
}