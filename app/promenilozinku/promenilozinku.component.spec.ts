import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenilozinkuComponent } from './promenilozinku.component';

describe('PromenilozinkuComponent', () => {
  let component: PromenilozinkuComponent;
  let fixture: ComponentFixture<PromenilozinkuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromenilozinkuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromenilozinkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
