import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetChartComponent } from './tweet-chart.component';

describe('TweetChartComponent', () => {
  let component: TweetChartComponent;
  let fixture: ComponentFixture<TweetChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
