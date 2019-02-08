import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HashtagFacetInputModel} from '../../query/hashtag-facet/hashtag-facet-input-model';
import {HashtagFacetFields} from '../../model/hashtag-facet-chart';
import {SolrService} from '../../service/solr/solr.service';
import {Query} from '../../model/query';
import {ApplicationConstants} from '../../util/application-constants';

import DataObjectCell = google.visualization.DataObjectCell;
import DataTable = google.visualization.DataTable;
import DataObject = google.visualization.DataObject;

@Component({
  selector: 'app-hashtag-chart',
  templateUrl: './hashtag-chart.component.html',
  styleUrls: ['./hashtag-chart.component.css']
})
export class HashtagChartComponent implements OnInit {
  @Input() hashtagFacetInputModel: HashtagFacetInputModel;
  myOptions = {
    animation: {
      duration: 3000,
      easing: 'linear',
    },
    colors: ['5D78FF'],
    is3D: true,
    'width': 600,
    height: 450,
    legend: {position: 'none'},
    bar: {groupWidth: '40%'},
    textStyle: {
      fontName: 'Helvetica',
      fontSize: '12px',
      bold: true,
      italic: true,
      // The color of the text.
      color: '#871b47',
      // The color of the text outline.
      auraColor: '#d799ae',
      // The transparency of the text.
      opacity: 0.8
    },
    hAxis: {
      textStyle: {
        color: '#3D4465FF',
        fontName: 'Arvo, Helvetica',
        fontSize: 10
      }
    },
    vAxis: {
      textStyle: {
        color: '#3D4465FF',
        fontName: 'Arvo, Helvetica',
        fontSize: 10
      }
    },

  };
  chartData: Array<Array<string | number>>;

  constructor(private solrService: SolrService) {
    this.chartData = new Array<Array<string | number>>();
  }

  ngOnInit() {
    this.getHashtagCounts();
  }

  getHashtagCounts(): void {
    this.solrService.getFacetCountsForHashtagsChart(this.hashtagFacetInputModel.focus_area, this.hashtagFacetInputModel.value)
      .subscribe(hashtagFacet => {
        let new_data_array = new Array<Array<string | number>>();
        hashtagFacet.facet_counts.facet_fields.hashtags.forEach(value => {
          let new_data = new Array<string | number>();
          new_data.push('#' + value.name);
          new_data.push(value.value);
          new_data_array.push(new_data);

        });

        this.chartData = new_data_array;

      }, error1 => {
        // TODO: Implement the error state.
      });

  }
}
