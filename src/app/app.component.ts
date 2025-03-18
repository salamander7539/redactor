import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {}
