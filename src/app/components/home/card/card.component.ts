import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../../interfaces/article';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() item!: Article;

  constructor(private router: Router) {}

  route = inject(ActivatedRoute);

  gotoItems(article: Article) {
    const articleId = article.id;
    // Pass along the hero id if available
    // so that the HeroList component can select that item.
    this.router.navigate(['redactor'], {
      queryParams:{
        id: articleId,
      },
      state: { articleData: article },
    });
  }
}
