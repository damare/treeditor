import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostElementsComponent } from './lost-elements.component';

describe('LostElementsComponent', () => {
  let component: LostElementsComponent;
  let fixture: ComponentFixture<LostElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LostElementsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LostElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
