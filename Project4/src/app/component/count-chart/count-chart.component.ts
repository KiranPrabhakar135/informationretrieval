import {Component, Input, OnInit} from '@angular/core';
import {ChartInputModel} from '../../query/charts/chart-input-model';
import {HashtagFacetFields} from '../../model/hashtag-facet-chart';
import {SolrService} from '../../service/solr/solr.service';
import {ApplicationConstants} from '../../util/application-constants';

@Component({
  selector: 'app-count-chart',
  templateUrl: './count-chart.component.html',
  styleUrls: ['./count-chart.component.css']
})
export class CountChartComponent implements OnInit {

  @Input() chartInputModel: ChartInputModel;
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
      fontName: 'Arvo, Helvetica',
      fontSize: '1',
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
    this.getDateCounts();
  }

  getDateCounts(): void {
    this.solrService.getFacetCountsForTimeChart(this.chartInputModel).subscribe(chart => {
      let new_data_array = new Array<Array<string | number>>();
      if (this.chartInputModel.focus_area === ApplicationConstants.FOCUS_AREA_TOPIC) {
        chart.facet_counts.facet_fields['queryMetadata.query_topic'].forEach(value => {
          if (value.name !== 'unrest') {
            let new_data = new Array<string | number>();
            new_data.push(ApplicationConstants.getFormattedTopicName(value.name));
            new_data.push(value.value);
            new_data_array.push(new_data);
          }
        });
      } else if (this.chartInputModel.focus_area === ApplicationConstants.FOCUS_AREA_CITY) {
        chart.facet_counts.facet_fields['queryMetadata.query_city'].forEach(value => {
          if (value.name !== 'city') {
            let new_data = new Array<string | number>();
            new_data.push(ApplicationConstants.getFormattedCityName(value.name));
            new_data.push(value.value);
            new_data_array.push(new_data);
          }
        });
      } else if (this.chartInputModel.focus_area === ApplicationConstants.FOCUS_AREA_LANGUAGE) {
        chart.facet_counts.facet_fields['queryMetadata.query_language'].forEach(value => {
          let new_data = new Array<string | number>();
          new_data.push(ApplicationConstants.getFormattedLanguageName(value.name));
          new_data.push(value.value);
          new_data_array.push(new_data);
        });
      }
      this.chartData = new_data_array;

    }, error1 => {
      // TODO: Implement the error state.
    });
  }
}
