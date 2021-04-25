import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppOutletComponent } from './app-outlet.component';

describe('AppOutletComponent', () => {
  let component: AppOutletComponent;
  let fixture: ComponentFixture<AppOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppOutletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
