import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyBladeComponent } from './lazy-blade.component';

describe('LazyBladeComponent', () => {
  let component: LazyBladeComponent;
  let fixture: ComponentFixture<LazyBladeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LazyBladeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyBladeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
