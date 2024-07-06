/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ModalHelperComponent } from './modal-helper.component';

describe('ModalHelperComponent', () => {
  let component: ModalHelperComponent;
  let fixture: ComponentFixture<ModalHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalHelperComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
