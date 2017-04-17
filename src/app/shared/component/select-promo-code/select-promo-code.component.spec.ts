/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SelectPromoCodeComponent } from './select-promo-code.component';

describe('SelectPromoCodeComponent', () => {
  let component: SelectPromoCodeComponent;
  let fixture: ComponentFixture<SelectPromoCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPromoCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPromoCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
