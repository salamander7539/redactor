import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    
  }
}
