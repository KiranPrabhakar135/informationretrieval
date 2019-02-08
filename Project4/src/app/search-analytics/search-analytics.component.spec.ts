import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAnalyticsComponent } from './search-analytics.component';

describe('SearchAnalyticsComponent', () => {
  let component: SearchAnalyticsComponent;
  let fixture: ComponentFixture<SearchAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
