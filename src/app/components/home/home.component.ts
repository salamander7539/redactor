import { Component } from '@angular/core';
import { PaginationComponent } from "./pagination/pagination.component";

@Component({
  selector: 'app-home',
  imports: [PaginationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  
}
