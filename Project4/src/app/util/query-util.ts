import {Query} from '../model/query';
import {FilterInputModel} from '../query/filters/filter-input-model';
import {SearchInputModel} from '../query/search/search-input-model';
import {HttpParams} from '@angular/common/http';
import {isNullOrUndefined} from 'util';
import {FilterType} from '../query/filters/filter-type';
import {ApplicationConstants} from './application-constants';

export class QueryUtil {

  public static getQueryParamsForSearch(query, queryObj: Query, pageNumber?: number, pageSize?: number,
                                        filterQuery?: FilterInputModel[]): SearchInputModel {

    let queryParameters = new SearchInputModel();
    if (pageNumber != null && pageSize != null) {
      const start = (pageNumber - 1) * (pageSize);
      queryParameters.params = new HttpParams().append('start', start.toString())
        .append('rows', pageSize.toString());
    } else {
      queryParameters.params = new HttpParams();
    }

    if (!isNullOrUndefined(query) && query) {
      queryParameters.params = queryParameters.params
        .append('q', query);
    }
    if (!isNullOrUndefined(filterQuery) && filterQuery.length > 0) {
      let queryParmas = '';
      filterQuery.forEach(value => {
        if (!isNullOrUndefined(value)) {
          switch (value.filter_type) {
            case FilterType.FILTER_TYPE_CITY:
              // queryParameters.params = queryParameters.params
              //   .append('q',  ApplicationConstants.FOCUS_AREA_CITY + ':' + value.code )
              queryParmas = queryParmas.concat('"' + ApplicationConstants.FOCUS_AREA_CITY + '":"' + value.code + '",');
              // queryParameters.params = queryParameters.params.append(ApplicationConstants.FOCUS_AREA_CITY, value.code);
              break;
            case FilterType.FILTER_TYPE_LANGUAGE:
              // queryParameters.params = queryParameters.params
              //   .append('q',  ApplicationConstants.FOCUS_AREA_LANGUAGE + ':' + value.code )
              queryParmas = queryParmas.concat('"' + ApplicationConstants.FOCUS_AREA_LANGUAGE + '":"' + value.code + '",');
              // queryParameters.params = queryParameters.params.append(ApplicationConstants.FOCUS_AREA_LANGUAGE, value.code);
              break;
            case FilterType.FILTER_TYPE_TOPIC:
              // queryParameters.params = queryParameters.params
              //   .append('q',  ApplicationConstants.FOCUS_AREA_TOPIC + ':' + value.code )
              queryParmas = queryParmas.concat('"' + ApplicationConstants.FOCUS_AREA_TOPIC + '":"' + value.code + '",');
              // queryParameters.params = queryParameters.params.append(ApplicationConstants.FOCUS_AREA_TOPIC, value.code);
              break;
            default:
              break;
            // case FilterType.FILTER_TYPE_DATE_RANGE:
            //   queryParameters.params.set(ApplicationConstants.Focus_Area_)
          }
        }

      });
      // This is or case
      queryParmas = queryParmas.length > 0 ? queryParmas.substring(0, queryParmas.length - 1) : queryParmas;
      if (!isNullOrUndefined(query)) {
        queryParameters.params = queryParameters.params
          .set('q', query + ',' + queryParmas);
      } else {
        queryParameters.params = queryParameters.params
          .set('q', queryParmas);
      }
    }
    if (!isNullOrUndefined(queryObj)) {
      queryParameters.params = queryParameters.params
        .append('q', '"' + queryObj.focusArea + '":"' + queryObj.key + '","' + 'entities.hashtags.text":"' + queryObj.value + '"');
    }

    return queryParameters;
  }
}
