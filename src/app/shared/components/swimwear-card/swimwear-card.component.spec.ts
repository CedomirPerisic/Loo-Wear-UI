import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwimwearCardComponent } from './swimwear-card.component';

describe('SwimwearCardComponent', () => {
  let component: SwimwearCardComponent;
  let fixture: ComponentFixture<SwimwearCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwimwearCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwimwearCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
