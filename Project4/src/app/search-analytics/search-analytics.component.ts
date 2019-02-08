import {Component, OnInit} from '@angular/core';
import {ChartModule} from 'primeng/chart';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {SolrService} from '../service/solr/solr.service';
import {HashtagFacetInputModel} from '../query/hashtag-facet/hashtag-facet-input-model';
import {HashtagFacetInputModelGenerator} from '../query/hashtag-facet/hashtag-facet-input-model-generator';
import {ChartInputModel} from '../query/charts/chart-input-model';
import {ChartInputModelGenerator} from '../query/charts/chart-input-model-generator';
import {HashtagChartFacetInputModelGenerator} from '../query/hashtag-facet/hashtag-chart-facet-model-generator';

declare var require: any;
// const language = require('@google-cloud/language');
// const client = new language.LanguageServiceClient();


@Component({
  selector: 'app-search-analytics',
  templateUrl: './search-analytics.component.html',
  styleUrls: ['./search-analytics.component.css']
})
export class SearchAnalyticsComponent implements OnInit {

  hashtagFacetInputModelList: HashtagFacetInputModel[];

  chartInputModelList: ChartInputModel[];
  w_1: any;
  m_1: any;
  m_6: any;

  tw_1: any;
  tm_1: any;
  tm_6: any;
  ht: any;

  myData = [
    ['London', 8136000],
    ['New York', 8538000],
    ['Paris', 2244000],
    ['Berlin', 3470000],
    ['Kairo', 19500000],
  ];

  myColumnNames = [
    'test', 'test', 'test', 'test', 'tes',
  ];

  myOptions = {
    animation: {
      duration: 1000,
      easing: 'out',
    },
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    is3D: true
  };

  constructor(private http: HttpClient) {
    this.w_1 = {
      labels: ['New York City', 'Delhi', 'Paris', 'Bangkok', 'Mexico City'],
      datasets: [
        {
          label: 'Tweet Share for Last 100 Days',
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
          data: [34582, 14705, 29782, 2153, 3797]
        }
      ]
    };
    this.m_1 = {
      labels: ['New York City', 'Delhi', 'Paris', 'Bangkok', 'Mexico City'],
      datasets: [
        {
          label: 'Tweet Share for Last 6 Months',
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
          data: [39019, 18606, 33485, 3061, 38229]
        }
      ]
    };
    this.m_6 = {
      labels: ['New York City', 'Delhi', 'Paris', 'Bangkok', 'Mexico City'],
      datasets: [
        {
          label: 'Tweet Share for 12 Months',
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
          data: [105376, 54723, 87120, 8879, 103587]
        }
      ]
    };

    this.tm_6 = {
      labels: ['Environment', 'Politics', 'Infrastructure', 'Crime', 'Social Unrest'],
      datasets: [
        {
          label: 'Tweet Share for Last 12 Months',
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
          data: [82204, 97023, 45820, 104564, 83747]
        }
      ]
    };
    this.tm_1 = {
      labels: ['Environment', 'Politics', 'Infrastructure', 'Crime', 'Social Unrest'],
      datasets: [
        {
          label: 'Tweet Share for Last 6 Months',
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
          data: [31260, 33627, 21876, 39720, 31880]
        }
      ]
    };
    this.tw_1 = {
      labels: ['Environment', 'Politics', 'Infrastructure', 'Crime', 'Social Unrest'],
      datasets: [
        {
          label: 'Tweet Share for 100 Days',
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
          data: [28582, 31185, 14684, 36769, 28806]
        }
      ]
    };


  }

  ngOnInit() {
    this.hashtagFacetInputModelList = HashtagChartFacetInputModelGenerator.getListOfInputModels();
    this.chartInputModelList = ChartInputModelGenerator.getListOfInputModels();
    // this.getSem();
  }

  performAjax(url) {
    this.http.get(url)
      .subscribe(
        data => {
          return data;
        },
        error => {
          console.log('Error', error);
        }
      );
  }

  getSem() {
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_city:bangkok&fq=created_at:[NOW-12MONTHS%20TO%20NOW]&rows=0');
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_city:bangkok&fq=created_at:[NOW-6MONTHS%20TO%20NOW]&rows=0');
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_city:bangkok&fq=created_at:[NOW-4MONTHS%20TO%20NOW]&rows=0');

    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_city:paris&fq=created_at:[NOW-12MONTHS%20TO%20NOW]&rows=0');
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_city:paris&fq=created_at:[NOW-6MONTHS%20TO%20NOW]&rows=0');
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_city:paris&fq=created_at:[NOW-4MONTHS%20TO%20NOW]&rows=0');

    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_city:delhi&fq=created_at:[NOW-12MONTHS%20TO%20NOW]&rows=0');
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_city:delhi&fq=created_at:[NOW-6MONTHS%20TO%20NOW]&rows=0');
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_city:delhi&fq=created_at:[NOW-4MONTHS%20TO%20NOW]&rows=0');

    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_city:mexico%20city&fq=created_at:[NOW-12MONTHS%20TO%20NOW]&rows=0');
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_city:mexico%20city&fq=created_at:[NOW-6MONTHS%20TO%20NOW]&rows=0');
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_city:mexico%20city&fq=created_at:[NOW-4MONTHS%20TO%20NOW]&rows=0');

    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_city:paris&fq=created_at:[NOW-12MONTHS%20TO%20NOW]&rows=0');
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_city:paris&fq=created_at:[NOW-6MONTHS%20TO%20NOW]&rows=0');
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_city:paris&fq=created_at:[NOW-4MONTHS%20TO%20NOW]&rows=0');

    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_topic:politics&fq=created_at:[NOW-12MONTHS%20TO%20NOW]&rows=0');
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_topic:politics&fq=created_at:[NOW-6MONTHS%20TO%20NOW]&rows=0');
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_topic:politics&fq=created_at:[NOW-4MONTHS%20TO%20NOW]&rows=0');

    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_topic:crime&fq=created_at:[NOW-12MONTHS%20TO%20NOW]&rows=0');
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_topic:crime&fq=created_at:[NOW-6MONTHS%20TO%20NOW]&rows=0');
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_topic:crime&fq=created_at:[NOW-4MONTHS%20TO%20NOW]&rows=0');

    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_topic:Infrastructure&fq=created_at:[NOW-12MONTHS%20TO%20NOW]&rows=0');
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_topic:Infrastructure&fq=created_at:[NOW-6MONTHS%20TO%20NOW]&rows=0');
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_topic:Infrastructure&fq=created_at:[NOW-4MONTHS%20TO%20NOW]&rows=0');

    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_topic:solcial%20unrest&fq=created_at:[NOW-12MONTHS%20TO%20NOW]&rows=0');
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_topic:solcial%20unrest&fq=created_at:[NOW-6MONTHS%20TO%20NOW]&rows=0');
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_topic:solcial%20unrest&fq=created_at:[NOW-4MONTHS%20TO%20NOW]&rows=0');

    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_topic:Environment&fq=created_at:[NOW-12MONTHS%20TO%20NOW]&rows=0');
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_topic:Environment&fq=created_at:[NOW-6MONTHS%20TO%20NOW]&rows=0');
    this.performAjax('http://ec2-18-224-179-186.us-east-2.compute.amazonaws.com:8983/solr/IRF18P4/select?q=*&fq=queryMetadata.query_topic:Environment&fq=created_at:[NOW-4MONTHS%20TO%20NOW]&rows=0');

    /*const text = 'Hello, world!';

    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };
    /*client
      .analyzeSentiment({document: document})
      .then(results => {
        const sentiment = results[0].documentSentiment;

        console.log(`Text: ${text}`);
        console.log(`Sentiment score: ${sentiment.score}`);
        console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
      })
      .catch(err => {
        console.error('ERROR:', err);
      });*/
    // const ml = require('ml-sentiment');
    // console.log(ml.clssify('rainy day but still in a good mode'));
  }

}
