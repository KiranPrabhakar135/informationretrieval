import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterInputModel} from '../../query/filters/filter-input-model';

@Component({
  selector: 'app-search-query',
  templateUrl: './search-query.component.html',
  styleUrls: ['./search-query.component.css']
})
export class SearchQueryComponent implements OnInit {

  @Input() searchPageQuery: string;
  @Input() searchPageFilter: FilterInputModel[];
  @Output() queryChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  performSearch(query) {
    this.searchPageQuery = query;
    this.queryChange.emit(query);
  }

  ngOnInit() {
  }
}
