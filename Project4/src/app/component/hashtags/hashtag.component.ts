import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SolrService} from '../../service/solr/solr.service';
import {HashtagFacetFields} from '../../model/hashtag-facet';
import {HashtagFacetInputModel} from '../../query/hashtag-facet/hashtag-facet-input-model';
import {Query} from '../../model/query';
import {ApplicationConstants} from '../../util/application-constants';

@Component({
  selector: 'app-hashtags',
  templateUrl: './hashtag.component.html',
  styleUrls: ['./hashtag.component.css']
})
export class HashtagComponent implements OnInit {

  @Input() hashtagFacetInputModel: HashtagFacetInputModel;
  @Output() triggerHashTagSearchEvent: EventEmitter<any> = new EventEmitter<any>();

  hashtagFacetFields: HashtagFacetFields;

  constructor(private solrService: SolrService) {
  }

  ngOnInit() {
    this.getHashtagCounts();
  }

  getHashtagCounts(): void {
    this.solrService.getFacetCountsForHashtags(this.hashtagFacetInputModel.focus_area, this.hashtagFacetInputModel.value)
      .subscribe(hashtagFacet => this.hashtagFacetFields = hashtagFacet.facet_counts.facet_fields, error1 => {
        // TODO: Implement the error state.
      });
  }

  triggerSearch(focusArea, key, value, inNewWindow: boolean): void {
    const queryObj = new Query();
    queryObj.focusArea = focusArea;
    if (key === ApplicationConstants.FOCUS_AREA_TOPIC_INFRASTRUCTURE_DISPLAY_STRING) {
      key = 'infra';
    }
    queryObj.key = key;
    queryObj.value = value;
    this.triggerHashTagSearchEvent.emit([queryObj, inNewWindow]);
  }
}
