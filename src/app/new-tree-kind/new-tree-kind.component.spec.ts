import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTreeKindComponent } from './new-tree-kind.component';

describe('NewTreeKindComponent', () => {
  let component: NewTreeKindComponent;
  let fixture: ComponentFixture<NewTreeKindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewTreeKindComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTreeKindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
