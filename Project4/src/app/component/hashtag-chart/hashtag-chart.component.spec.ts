import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HashtagChartComponent } from './hashtag-chart.component';

describe('HashtagChartComponent', () => {
  let component: HashtagChartComponent;
  let fixture: ComponentFixture<HashtagChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HashtagChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HashtagChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
