import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TweetDisplayComponent} from './tweet-display.component';

describe('TweetDisplayComponent', () => {
  let component: TweetDisplayComponent;
  let fixture: ComponentFixture<TweetDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetDisplayComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
