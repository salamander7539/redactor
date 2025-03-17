import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../interfaces/article';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-redactor-page',
  imports: [CommonModule],
  templateUrl: './redactor-page.component.html',
  styleUrl: './redactor-page.component.scss',
})
export class RedactorPageComponent {
  article: Article;
  permision: boolean = true;
  needToBeSaved: boolean = true;

  constructor(private route: Router, private firestore: Firestore) {
    this.article = this.route.getCurrentNavigation()?.extras.state?.[
      'articleData'
    ] as Article;

    console.log(this.article);
  }

  ngOnInit() {}

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
      this.firestore,
      'datas',
      this.article.id.toString()
    );
    const updateData = {
      description: input,
    };
    updateDoc(docInstance, updateData)
      .then(() => {
        console.log('Data Updated');
        this.route.navigateByUrl('home');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
