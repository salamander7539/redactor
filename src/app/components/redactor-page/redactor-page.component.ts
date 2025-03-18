import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Article } from '../../interfaces/article.interface';
import { doc, updateDoc } from '@angular/fire/firestore';
import { CollectionService } from '../../servises/collection.service';

@Component({
  selector: 'app-redactor-page',
  imports: [CommonModule],
  templateUrl: './redactor-page.component.html',
  styleUrl: './redactor-page.component.scss',
  standalone: true,
})
export class RedactorPageComponent {
  permision: boolean = true;
  needToBeSaved: boolean = true;
  private categoryService = inject(CollectionService);
  article: Article;

  constructor(private router: Router) {
    this.article = this.router.getCurrentNavigation()!.extras.state?.[
      'articleData'
    ] as Article;
  }

  handleDetails(value: Article) {
    localStorage.setItem('key', JSON.stringify(value));
    console.log('saved');
  }

  enableRedaction() {
    this.permision = !this.permision;
    console.log(this.permision);
  }

  checkIfChange(event: string) {
    this.needToBeSaved = false;
  }

  confirmChange(input: string) {
    if (window.confirm('Вы хотите сохранить запись?')) {
      this.updateDat(input);
    }
  }

  updateDat(input: string) {
    const docInstance = doc(
      this.categoryService.firestore,
      'datas',
      this.article.id.toString()
    );
    const updateData = {
      description: input,
    };
    updateDoc(docInstance, updateData)
      .then(() => {
        console.log('Data Updated');
        this.router.navigateByUrl('home');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
