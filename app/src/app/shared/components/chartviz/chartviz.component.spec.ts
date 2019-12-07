import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartvizComponent } from './chartviz.component';

describe('ChartvizComponent', () => {
  let component: ChartvizComponent;
  let fixture: ComponentFixture<ChartvizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartvizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartvizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
