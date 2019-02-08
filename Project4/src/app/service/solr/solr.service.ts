import {Injectable} from '@angular/core';
import {HashtagFacet} from '../../model/hashtag-facet';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SolrUrlConstants} from '../../util/url-constants';
import {QueryResponse} from '../../model/query-result';
import {Query} from '../../model/query';
import {FilterInputModel} from '../../query/filters/filter-input-model';
import {FilterType} from '../../query/filters/filter-type';
import {ApplicationConstants} from '../../util/application-constants';
import {isNullOrUndefined} from 'util';
import {ArbitFacet} from '../../model/arbit_facet';
import {EnumValue} from '@angular/compiler-cli/src/ngtsc/metadata';
import {QueryUtil} from '../../util/query-util';
import {SearchInputModel} from '../../query/search/search-input-model';
import {HashtagFacetChart} from '../../model/hashtag-facet-chart';
import {ChartInputModel} from '../../query/charts/chart-input-model';
import {DateFacetTopicChart} from '../../model/date-facet-topic-chart';

@Injectable({
  providedIn: 'root'
})
export class SolrService {

  constructor(private httpClient: HttpClient) {
  }

  getFacetCountsForHashtags(key: String, value: String): Observable<HashtagFacet> {
    value = value.trim();
    const options = value ?
      {
        params: new HttpParams().set('name', value.valueOf()).set('facet.field', 'hashtags').set('facet', 'on')
          .set('fq', key + ':' + value).set('q', '*:*').set('rows', '0').set('wt', 'json')
          .set('json.nl', 'map').set('facet.limit', '15')
      } : {};

    return this.httpClient.get<HashtagFacet>(SolrUrlConstants.SOLR_BASE_URL + SolrUrlConstants.SOLR_SEARCH_URL, options);
  }

  getFacetCounts(query, filterQuery?: FilterInputModel[]): Observable<ArbitFacet> {
    const options = {
      params: new HttpParams().set('facet.field', 'queryMetadata.query_topic').append('facet.field', 'queryMetadata.query_city').append('facet.field', 'queryMetadata.query_language').set('facet', 'on')
        .set('q', query).set('rows', '0').set('wt', 'json').set('json.nl', 'arrntv')
    };
    if (!isNullOrUndefined(filterQuery) && filterQuery.length > 0) {
      // let queryParmas = '';
      filterQuery.forEach(value => {
        if (!isNullOrUndefined(value)) {
          switch (value.filter_type) {
            case FilterType.FILTER_TYPE_CITY:
              options.params = options.params
                .append('fq', ApplicationConstants.FOCUS_AREA_CITY + ':' + value.code);
              // queryParmas = queryParmas.concat('"' + ApplicationConstants.FOCUS_AREA_CITY + '":"' + value.code + '",');
              // queryParameters.params = queryParameters.params.append(ApplicationConstants.FOCUS_AREA_CITY, value.code);
              break;
            case FilterType.FILTER_TYPE_LANGUAGE:
              options.params = options.params
                .append('fq', ApplicationConstants.FOCUS_AREA_LANGUAGE + ':' + value.code);
              // queryParmas = queryParmas.concat('"' + ApplicationConstants.FOCUS_AREA_LANGUAGE + '":"' + value.code + '",');
              // queryParameters.params = queryParameters.params.append(ApplicationConstants.FOCUS_AREA_LANGUAGE, value.code);
              break;
            case FilterType.FILTER_TYPE_TOPIC:
              options.params = options.params
                .append('fq', ApplicationConstants.FOCUS_AREA_TOPIC + ':' + value.code);
              // queryParmas = queryParmas.concat('"' + ApplicationConstants.FOCUS_AREA_TOPIC + '":"' + value.code + '",');
              // queryParameters.params = queryParameters.params.append(ApplicationConstants.FOCUS_AREA_TOPIC, value.code);
              break;
            case FilterType.FILTER_TYPE_DATE_RANGE:
              options.params = options.params
                .append('fq', ApplicationConstants.FOCUS_AREA_DATERANGE + ':' + value.code);
              // queryParmas = queryParmas.concat(ApplicationConstants.FOCUS_AREA_DATERANGE + ':' + value.code + ',');
              break;
            case FilterType.FILTER_TYPE_SORT:
              options.params = options.params
                .append('sort', value.code + ' desc');
              // queryParmas = queryParmas.concat(ApplicationConstants.FOCUS_AREA_DATERANGE + ':' + value.code + ',');
              break;
            default:
              break;
          }
        }

      });
      // This is or case
      // queryParmas = queryParmas.length > 0 ? queryParmas.substring(0, queryParmas.length - 1) : queryParmas;
      if (!isNullOrUndefined(query)) {
        options.params = options.params
          .set('q', query);
      } else {
        options.params = options.params
          .set('q', '*:*');
      }
    }
    return this.httpClient.get<ArbitFacet>(SolrUrlConstants.SOLR_BASE_URL + SolrUrlConstants.SOLR_SEARCH_URL, options);
  }

  // getFacetCountsForQueryResult(query, queryObj: Query, filterQuery?: FilterInputModel[]): Observable<ArbitFacet> {
  // let queryParameters = QueryUtil.getQueryParamsForSearch(query, queryObj, null, null, filterQuery);
  // const queryParams1 = queryParameters.params.set('facet.field', 'queryMetadata_query_city')
  //   .append('facet.field', 'queryMetadata_query_topic')
  //   .append('facet.field', 'queryMetadata_query_language').set('facet', 'on').set('rows', '0').set('wt', 'json')
  //   .set('json.nl', 'map');
  // return this.httpClient.get<ArbitFacet>(SolrUrlConstants.SOLR_BASE_URL + SolrUrlConstants.SOLR_SEARCH_URL, queryParameters);
  // }

  getSearchResults(query, pageNumber, pageSize, queryObj: Query, filterQuery?: FilterInputModel[]): Observable<QueryResponse> {
    const start = (pageNumber - 1) * (pageSize);
    const queryParameters = {
      params: new HttpParams().append('start', start.toString())
        .append('rows', pageSize.toString())
    };
    if (!isNullOrUndefined(query) && query) {
      queryParameters.params = queryParameters.params
        .append('q', query);
    }
    if (!isNullOrUndefined(filterQuery) && filterQuery.length > 0) {
      // let queryParmas = '';
      filterQuery.forEach(value => {
        if (!isNullOrUndefined(value)) {
          switch (value.filter_type) {
            case FilterType.FILTER_TYPE_CITY:
              queryParameters.params = queryParameters.params
                .append('fq', ApplicationConstants.FOCUS_AREA_CITY + ':' + value.code);
              // queryParmas = queryParmas.concat('"' + ApplicationConstants.FOCUS_AREA_CITY + '":"' + value.code + '",');
              // queryParameters.params = queryParameters.params.append(ApplicationConstants.FOCUS_AREA_CITY, value.code);
              break;
            case FilterType.FILTER_TYPE_LANGUAGE:
              queryParameters.params = queryParameters.params
                .append('fq', ApplicationConstants.FOCUS_AREA_LANGUAGE + ':' + value.code);
              // queryParmas = queryParmas.concat('"' + ApplicationConstants.FOCUS_AREA_LANGUAGE + '":"' + value.code + '",');
              // queryParameters.params = queryParameters.params.append(ApplicationConstants.FOCUS_AREA_LANGUAGE, value.code);
              break;
            case FilterType.FILTER_TYPE_TOPIC:
              queryParameters.params = queryParameters.params
                .append('fq', ApplicationConstants.FOCUS_AREA_TOPIC + ':' + value.code);
              // queryParmas = queryParmas.concat('"' + ApplicationConstants.FOCUS_AREA_TOPIC + '":"' + value.code + '",');
              // queryParameters.params = queryParameters.params.append(ApplicationConstants.FOCUS_AREA_TOPIC, value.code);
              break;
            case FilterType.FILTER_TYPE_DATE_RANGE:
              queryParameters.params = queryParameters.params
                .append('fq', ApplicationConstants.FOCUS_AREA_DATERANGE + ':' + value.code);
              // queryParmas = queryParmas.concat(ApplicationConstants.FOCUS_AREA_DATERANGE + ':' + value.code + ',');
              break;
            case FilterType.FILTER_TYPE_SORT:
              queryParameters.params = queryParameters.params
                .append('sort', value.code + ' desc');
              // queryParmas = queryParmas.concat(ApplicationConstants.FOCUS_AREA_DATERANGE + ':' + value.code + ',');
              break;
            default:
              break;
          }
        }

      });
      // This is or case
      // queryParmas = queryParmas.length > 0 ? queryParmas.substring(0, queryParmas.length - 1) : queryParmas;
      if (!isNullOrUndefined(query)) {
        queryParameters.params = queryParameters.params
          .set('q', query);
      } else {
        queryParameters.params = queryParameters.params
          .set('q', '*:*');
      }
    }
    if (!isNullOrUndefined(queryObj)) {
      queryParameters.params = queryParameters.params
        .append('q', '"' + queryObj.focusArea + '":"' + queryObj.key + '","' + 'entities.hashtags.text":"' + queryObj.value + '"');
    }
    if (!isNullOrUndefined(query) || !isNullOrUndefined(queryObj) || !isNullOrUndefined(filterQuery)) {
      return this.httpClient.get<QueryResponse>(SolrUrlConstants.SOLR_BASE_URL + SolrUrlConstants.SOLR_SEARCH_URL, queryParameters);
    }
    return new Observable<QueryResponse>();
  }

  getFacetCountsForHashtagsChart(key: String, value: String): Observable<HashtagFacetChart> {
    value = value.trim();
    const options = value ?
      {
        params: new HttpParams().set('name', value.valueOf()).set('facet.field', 'hashtags').set('facet', 'on')
          .set('fq', key + ':' + value).set('q', '*:*').set('rows', '0').set('wt', 'json')
          .set('json.nl', 'arrntv').set('facet.limit', '5')
      } : {};

    return this.httpClient.get<HashtagFacetChart>(SolrUrlConstants.SOLR_BASE_URL + SolrUrlConstants.SOLR_SEARCH_URL, options);
  }

  getFacetCountsForTimeChart(facetChartInputModel: ChartInputModel): Observable<DateFacetTopicChart> {
    const options = {
      params: new HttpParams().set('facet.field', facetChartInputModel.focus_area).set('facet', 'on')
        .set('fq', 'created_at' + ':' + facetChartInputModel.date_range).set('q', '*:*').set('rows', '0').set('wt', 'json')
        .set('json.nl', 'arrntv')
    };

    return this.httpClient.get<DateFacetTopicChart>(SolrUrlConstants.SOLR_BASE_URL + SolrUrlConstants.SOLR_SEARCH_URL, options);
  }
}
