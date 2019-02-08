import {ApplicationConstants} from '../../util/application-constants';
import {FilterInputModel} from './filter-input-model';
import {FilterType} from './filter-type';

export class FilterInputModelGenerator {

  public static getListOfInputModels(filterType: FilterType): FilterInputModel[] {
    if (filterType === FilterType.FILTER_TYPE_TOPIC) {
      return [
        {
          display: ApplicationConstants.FOCUS_AREA_TOPIC_ENVIRONMENT_DISPLAY_STRING,
          code: ApplicationConstants.FOCUS_AREA_TOPIC_ENVIRONMENT_DISPLAY_STRING,
          filter_type: FilterType.FILTER_TYPE_TOPIC
        },
        {
          display: ApplicationConstants.FOCUS_AREA_TOPIC_POLITICS_DISPLAY_STRING,
          code: ApplicationConstants.FOCUS_AREA_TOPIC_POLITICS_DISPLAY_STRING,
          filter_type: FilterType.FILTER_TYPE_TOPIC
        },
        {
          display: ApplicationConstants.FOCUS_AREA_TOPIC_CRIME_DISPLAY_STRING,
          code: ApplicationConstants.FOCUS_AREA_TOPIC_CRIME_DISPLAY_STRING,
          filter_type: FilterType.FILTER_TYPE_TOPIC
        },
        {
          display: ApplicationConstants.FOCUS_AREA_TOPIC_SOCIAL_UNREST_DISPLAY_STRING,
          code: ApplicationConstants.FOCUS_AREA_TOPIC_SOCIAL_UNREST_DISPLAY_STRING,
          filter_type: FilterType.FILTER_TYPE_TOPIC
        },
        {
          display: ApplicationConstants.FOCUS_AREA_TOPIC_INFRASTRUCTURE_DISPLAY_STRING,
          code: ApplicationConstants.FOCUS_AREA_TOPIC_INFRASTRUCTURE_CODE_STRING,
          filter_type: FilterType.FILTER_TYPE_TOPIC
        }
      ];
    } else if (filterType === FilterType.FILTER_TYPE_LANGUAGE) {
      return [
        {
          filter_type: FilterType.FILTER_TYPE_LANGUAGE,
          code: ApplicationConstants.FOCUS_AREA_LANGUAGE_EN_CODE_STRING,
          display: ApplicationConstants.FOCUS_AREA_LANGUAGE_EN_DISPLAY_STRING
        },
        {
          filter_type: FilterType.FILTER_TYPE_LANGUAGE,
          code: ApplicationConstants.FOCUS_AREA_LANGUAGE_HI_CODE_STRING,
          display: ApplicationConstants.FOCUS_AREA_LANGUAGE_HI_DISPLAY_STRING
        },
        {
          filter_type: FilterType.FILTER_TYPE_LANGUAGE,
          code: ApplicationConstants.FOCUS_AREA_LANGUAGE_FR_CODE_STRING,
          display: ApplicationConstants.FOCUS_AREA_LANGUAGE_FR_DISPLAY_STRING
        },
        {
          filter_type: FilterType.FILTER_TYPE_LANGUAGE,
          code: ApplicationConstants.FOCUS_AREA_LANGUAGE_TH_CODE_STRING,
          display: ApplicationConstants.FOCUS_AREA_LANGUAGE_TH_DISPLAY_STRING
        },
        {
          filter_type: FilterType.FILTER_TYPE_LANGUAGE,
          code: ApplicationConstants.FOCUS_AREA_LANGUAGE_ES_CODE_STRING,
          display: ApplicationConstants.FOCUS_AREA_LANGUAGE_ES_DISPLAY_STRING
        }
      ];
    } else if (filterType === FilterType.FILTER_TYPE_CITY) {
      return [
        {
          filter_type: FilterType.FILTER_TYPE_CITY,
          code: ApplicationConstants.FOCUS_AREA_CITY_NYC_CODE_STRING,
          display: ApplicationConstants.FOCUS_AREA_CITY_NYC_DISPLAY_STRING
        },
        {
          filter_type: FilterType.FILTER_TYPE_CITY,
          code: ApplicationConstants.FOCUS_AREA_CITY_DELHI_CODE_STRING,
          display: ApplicationConstants.FOCUS_AREA_CITY_DELHI_DISPLAY_STRING
        },
        {
          filter_type: FilterType.FILTER_TYPE_CITY,
          code: ApplicationConstants.FOCUS_AREA_CITY_PARIS_CODE_STRING,
          display: ApplicationConstants.FOCUS_AREA_CITY_PARIS_DISPLAY_STRING
        },
        {
          filter_type: FilterType.FILTER_TYPE_CITY,
          code: ApplicationConstants.FOCUS_AREA_CITY_BANGKOK_CODE_STRING,
          display: ApplicationConstants.FOCUS_AREA_CITY_BANGKOK_DISPLAY_STRING
        },
        {
          filter_type: FilterType.FILTER_TYPE_CITY,
          code: ApplicationConstants.FOCUS_AREA_CITY_MEXICO_CITY_CODE_STRING,
          display: ApplicationConstants.FOCUS_AREA_CITY_MEXICO_CITY_DISPLAY_STRING
        }
      ];
    } else if (filterType === FilterType.FILTER_TYPE_SORT) {
      return [
        {
          filter_type: FilterType.FILTER_TYPE_SORT,
          code: ApplicationConstants.FOCUS_AREA_DATERANGE,
          display: ApplicationConstants.SORT_BY_CREATED_AT_DISPLAY_STRING
        },
        {
          filter_type: FilterType.FILTER_TYPE_SORT,
          code: ApplicationConstants.FAVORITE_COUNT,
          display: ApplicationConstants.SORT_BY_FAVORITE_COUNT_DISPLAY_STRING
        },
        {
          filter_type: FilterType.FILTER_TYPE_SORT,
          code: ApplicationConstants.RE_TWEET_COUNT,
          display: ApplicationConstants.SORT_BY_RE_TWEETED_COUNT_DISPLAY_STRING
        }
      ];
    }
  }
}
