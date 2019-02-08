import {Component, OnInit} from '@angular/core';
import {HashtagFacetInputModel} from '../../query/hashtag-facet/hashtag-facet-input-model';
import {HashtagFacetInputModelGenerator} from '../../query/hashtag-facet/hashtag-facet-input-model-generator';
import {Query} from '../../model/query';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hashtagFacetInputModelList: HashtagFacetInputModel[];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.hashtagFacetInputModelList = HashtagFacetInputModelGenerator.getListOfInputModels();
  }

  captureHashtagSearchEvent(queryDetails: []) {
    // @ts-ignore
    const query: Query = queryDetails[0];
    // @ts-ignore
    const inNewWindow: boolean = queryDetails[1];
    if (inNewWindow) {
      window.open('/search?focusArea=' + query.focusArea + '&topic=' + query.key);
    } else {
      this.router.navigate(['/search'], {queryParams: {focusArea: query.focusArea, topic: query.key, hashtag: query.value}});
    }
  }

  captureFreeTextSearchEvent(query: string) {
    this.router.navigate(['/search'], {queryParams: {query: query}});
  }
}
