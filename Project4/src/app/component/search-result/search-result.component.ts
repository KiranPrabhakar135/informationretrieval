import {Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, EventEmitter, Output} from '@angular/core';
import {SolrService} from '../../service/solr/solr.service';
import {Tweet} from '../../model/query-result';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Query} from '../../model/query';
import {FilterInputModel} from '../../query/filters/filter-input-model';
import {ArbitFacet, ArbitFacetFields} from '../../model/arbit_facet';
import {FacetInput} from '../../query/facets/facet-input';
import {ApplicationConstants} from '../../util/application-constants';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy, OnChanges, DoCheck {
  @Input() query: string;
  @Input() filterQuery: FilterInputModel[];
  hashTagQueryObject: Query;
  results: Tweet[];
  facetResultFields: Array<Array<Array<string | number>>>;
  pageSize = 10;
  totalTweets = 0;
  currentPage = 1;
  searched = false;
  @Output() facetInputEventEmitter: EventEmitter<Array<Array<Array<string | number>>>> = new EventEmitter<Array<Array<Array<string | number>>>>();

  constructor(private searchResults: SolrService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private locationService: Location) {
    this.facetResultFields = new Array<Array<Array<string | number>>>();
  }

  getTweets(query, pageNumber, pageSize, queryObj?: Query, filterQuery?: FilterInputModel[]) {
    this.searched = true;
    this.searchResults.getSearchResults(query, pageNumber, pageSize, queryObj, filterQuery).subscribe(tweet => {
      if (tweet.response != null) {
        this.results = tweet.response.docs;
        this.totalTweets = tweet.response.numFound;
        this.currentPage = pageNumber;
      }
    });
    const facetQuery = this.query;

    this.facetResultFields = new Array<Array<Array<string | number>>>();
    this.searchResults.getFacetCounts(facetQuery, filterQuery)
      .subscribe(facetResults => {

          let topic_new_data_array = new Array<Array<string | number>>();
          facetResults.facet_counts.facet_fields['queryMetadata.query_topic'].forEach(value => {

            if (value.name !== 'unrest') {
              let new_data = new Array<string | number>();
              new_data.push(ApplicationConstants.getFormattedTopicName(value.name));
              new_data.push(value.value);
              topic_new_data_array.push(new_data);
            }
          });

          let city_new_data_array = new Array<Array<string | number>>();
          facetResults.facet_counts.facet_fields['queryMetadata.query_city'].forEach(value => {

            if (value.name !== 'city') {
              let new_data = new Array<string | number>();
              new_data.push(ApplicationConstants.getFormattedCityName(value.name));
              new_data.push(value.value);
              city_new_data_array.push(new_data);
            }
          });

          let lanugage_new_data_array = new Array<Array<string | number>>();
          facetResults.facet_counts.facet_fields['queryMetadata.query_language'].forEach(value => {


            let new_data = new Array<string | number>();
            new_data.push(ApplicationConstants.getFormattedLanguageName(value.name));
            new_data.push(value.value);
            lanugage_new_data_array.push(new_data);

          });

          this.facetResultFields.push(topic_new_data_array);
          this.facetResultFields.push(city_new_data_array);
          this.facetResultFields.push(lanugage_new_data_array);



        }, error1 => {
    });
    // this.searchResults.getFacetCounts(facetQuery, 'queryMetadata.query_topic', filterQuery)
    //   .subscribe(facetResults => this.facetResultFields[1] = facetResults.facet_counts.facet_fields, error1 => {
    // });
    // const facetQuery_2 = 'queryMetadata.query_city:delhi';
    // this.searchResults.getFacetCounts(facetQuery, 'queryMetadata.query_topic', filterQuery)
    //   .subscribe(facetResults => this.facetResultFields[2] = facetResults.facet_counts.facet_fields, error1 => {
    // });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        if (propName === 'query') {
          const change = changes[propName];
          if (!change.firstChange) {
            const curVal = JSON.stringify(change.currentValue);
            this.getTweets(curVal, 1, this.pageSize);
          }
        }
        if (propName === 'filterQuery') {
          const change = changes[propName];
          this.getTweets(this.query, 1, this.pageSize, null, change.currentValue);
        }
      }
    }
  }

  ngDoCheck() {

  }

  getPage(pageNumber: number) {
    this.getTweets(this.query, pageNumber, this.pageSize, this.hashTagQueryObject, this.filterQuery);
  }

  onSearch(query: string): void {
    this.getTweets(query, 1, this.pageSize);
  }

  sendMessage() {
    console.log('in search results')
    console.log(this.facetResultFields)
    this.facetInputEventEmitter.emit(this.facetResultFields);
  }

  // analyseResultSet() {
  //   this.facetInputEventEmitter.emit(new FacetInput(this.query, this.hashTagQueryObject, this.filterQuery));
  // }

  ngOnInit() {
    const freeTextSearchQuery = this.activatedRoute.snapshot.queryParams['query'];
    const topic = this.activatedRoute.snapshot.queryParams['topic'];
    const hashTag = this.activatedRoute.snapshot.queryParams['hashtag'];
    const focusArea = this.activatedRoute.snapshot.queryParams['focusArea'];
    this.locationService.replaceState('/search');
    if (freeTextSearchQuery) {
      this.query = freeTextSearchQuery;
      this.getTweets(freeTextSearchQuery, 1, this.pageSize);
    }
    if (hashTag) {
      const queryObject = new Query();
      queryObject.key = topic;
      queryObject.value = hashTag;
      queryObject.focusArea = focusArea;
      this.hashTagQueryObject = queryObject;
      this.getTweets('', 1, this.pageSize, queryObject);
    }
  }

  ngOnDestroy() {
  }
}
