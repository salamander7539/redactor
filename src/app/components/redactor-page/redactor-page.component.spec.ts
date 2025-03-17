import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactorPageComponent } from './redactor-page.component';

describe('RedactorPageComponent', () => {
  let component: RedactorPageComponent;
  let fixture: ComponentFixture<RedactorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedactorPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedactorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
