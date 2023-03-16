import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledzahtevaComponent } from './pregledzahteva.component';

describe('PregledzahtevaComponent', () => {
  let component: PregledzahtevaComponent;
  let fixture: ComponentFixture<PregledzahtevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledzahtevaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledzahtevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
