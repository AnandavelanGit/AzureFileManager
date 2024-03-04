import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretQuestion2Component } from './secret-question2.component';

describe('SecretQuestion2Component', () => {
  let component: SecretQuestion2Component;
  let fixture: ComponentFixture<SecretQuestion2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecretQuestion2Component]
    });
    fixture = TestBed.createComponent(SecretQuestion2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
