import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {HashtagFacetInputModel} from './query/hashtag-facet/hashtag-facet-input-model';
import {HashtagFacetInputModelGenerator} from './query/hashtag-facet/hashtag-facet-input-model-generator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IR Project 4';
  hashtagFacetInputModelList: HashtagFacetInputModel[];

  constructor() {
  }

  ngOnInit() {
    this.hashtagFacetInputModelList = HashtagFacetInputModelGenerator.getListOfInputModels();
  }
}
