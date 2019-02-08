import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FilterInputModel} from '../../query/filters/filter-input-model';
import {forEach} from '@angular/router/src/utils/collection';
import {SearchResultComponent} from '../search-result/search-result.component';
import {Tweet} from '../../model/query-result';
import {ArbitFacetFields} from '../../model/arbit_facet';
import {FacetInput} from '../../query/facets/facet-input';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query: string;
  filterQuery: FilterInputModel[];
  facetInput: Array<Array<Array<string | number>>>;
  hideSearchResults: Boolean = false;

  captureQueryChangeEvent(event) {
    this.query = event;
  }
  backToSearch(event: boolean){
    this.hideSearchResults = false;
  }

  captureFacetInputEvent(event) {
    this.facetInput = event;
    this.hideSearchResults = true;
    console.log('checking facetInput');
  }

  performFilterSearch(event: FilterInputModel[]) {
    const newFilterModel: FilterInputModel[] = [];
    event.forEach(value => {
      newFilterModel.push(value);
    });
    this.filterQuery = newFilterModel;
  }

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.query = this.activatedRoute.snapshot.queryParams['query'];
  }

}
