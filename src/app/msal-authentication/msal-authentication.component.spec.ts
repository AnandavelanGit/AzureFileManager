import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsalAuthenticationComponent } from './msal-authentication.component';

describe('MsalAuthenticationComponent', () => {
  let component: MsalAuthenticationComponent;
  let fixture: ComponentFixture<MsalAuthenticationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MsalAuthenticationComponent]
    });
    fixture = TestBed.createComponent(MsalAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
