import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileManagerNavigationComponent } from './file-manager-navigation.component';

describe('FileManagerNavigationComponent', () => {
  let component: FileManagerNavigationComponent;
  let fixture: ComponentFixture<FileManagerNavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileManagerNavigationComponent]
    });
    fixture = TestBed.createComponent(FileManagerNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
