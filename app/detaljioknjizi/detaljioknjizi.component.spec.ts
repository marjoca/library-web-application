import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaljioknjiziComponent } from './detaljioknjizi.component';

describe('DetaljioknjiziComponent', () => {
  let component: DetaljioknjiziComponent;
  let fixture: ComponentFixture<DetaljioknjiziComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaljioknjiziComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaljioknjiziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
