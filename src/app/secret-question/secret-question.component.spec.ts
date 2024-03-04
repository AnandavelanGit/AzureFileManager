import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretQuestionComponent } from './secret-question.component';

describe('SecretQuestionComponent', () => {
  let component: SecretQuestionComponent;
  let fixture: ComponentFixture<SecretQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecretQuestionComponent]
    });
    fixture = TestBed.createComponent(SecretQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
