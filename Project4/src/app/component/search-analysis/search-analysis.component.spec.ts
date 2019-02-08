import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchAnalysisComponent} from './search-analysis.component';

describe('SearchAnalysisComponent', () => {
  let component: SearchAnalysisComponent;
  let fixture: ComponentFixture<SearchAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchAnalysisComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
