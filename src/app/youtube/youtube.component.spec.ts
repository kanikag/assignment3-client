import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RssFeedComponent } from './youtube.component';

describe('RssFeedComponent', () => {
  let component: RssFeedComponent;
  let fixture: ComponentFixture<RssFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RssFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RssFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
