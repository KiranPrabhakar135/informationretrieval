import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {

  today: number;
  query: string;
  @Output() freeTextSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) {
  }
  performSearch(query) {
    this.freeTextSearch.emit(query);
  }

  ngOnInit() {
    this.today = Date.now();
  }
}
