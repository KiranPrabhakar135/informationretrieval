import {HashtagFacetInputModel} from './hashtag-facet-input-model';
import {ApplicationConstants} from '../../util/application-constants';

export class HashtagFacetInputModelGenerator {
  public static getListOfInputModels(): HashtagFacetInputModel[] {
    return [
      {
        focus_area: ApplicationConstants.FOCUS_AREA_TOPIC,
        value: ApplicationConstants.FOCUS_AREA_TOPIC_ENVIRONMENT_DISPLAY_STRING,
        value_display_string: ApplicationConstants.FOCUS_AREA_TOPIC_ENVIRONMENT_DISPLAY_STRING
      },
      {
        focus_area: ApplicationConstants.FOCUS_AREA_TOPIC,
        value: ApplicationConstants.FOCUS_AREA_TOPIC_POLITICS_DISPLAY_STRING,
        value_display_string: ApplicationConstants.FOCUS_AREA_TOPIC_POLITICS_DISPLAY_STRING
      },
      {
        focus_area: ApplicationConstants.FOCUS_AREA_TOPIC,
        value: ApplicationConstants.FOCUS_AREA_TOPIC_CRIME_DISPLAY_STRING,
        value_display_string: ApplicationConstants.FOCUS_AREA_TOPIC_CRIME_DISPLAY_STRING
      },
      {
        focus_area: ApplicationConstants.FOCUS_AREA_TOPIC,
        value: ApplicationConstants.FOCUS_AREA_TOPIC_SOCIAL_UNREST_DISPLAY_STRING,
        value_display_string: ApplicationConstants.FOCUS_AREA_TOPIC_SOCIAL_UNREST_DISPLAY_STRING
      },
      {
        focus_area: ApplicationConstants.FOCUS_AREA_TOPIC,
        value: ApplicationConstants.FOCUS_AREA_TOPIC_INFRASTRUCTURE_CODE_STRING,
        value_display_string: ApplicationConstants.FOCUS_AREA_TOPIC_INFRASTRUCTURE_DISPLAY_STRING
      },
      // {
      //   focus_area: ApplicationConstants.FOCUS_AREA_LANGUAGE,
      //   value: ApplicationConstants.FOCUS_AREA_LANGUAGE_EN_CODE_STRING,
      //   value_display_string: ApplicationConstants.FOCUS_AREA_LANGUAGE_EN_DISPLAY_STRING
      // },
      // {
      //   focus_area: ApplicationConstants.FOCUS_AREA_LANGUAGE,
      //   value: ApplicationConstants.FOCUS_AREA_LANGUAGE_HI_CODE_STRING,
      //   value_display_string: ApplicationConstants.FOCUS_AREA_LANGUAGE_HI_DISPLAY_STRING
      // },
      // {
      //   focus_area: ApplicationConstants.FOCUS_AREA_LANGUAGE,
      //   value: ApplicationConstants.FOCUS_AREA_LANGUAGE_FR_CODE_STRING,
      //   value_display_string: ApplicationConstants.FOCUS_AREA_LANGUAGE_FR_DISPLAY_STRING
      // },
      // {
      //   focus_area: ApplicationConstants.FOCUS_AREA_LANGUAGE,
      //   value: ApplicationConstants.FOCUS_AREA_LANGUAGE_TH_CODE_STRING,
      //   value_display_string: ApplicationConstants.FOCUS_AREA_LANGUAGE_TH_DISPLAY_STRING
      // },
      // {
      //   focus_area: ApplicationConstants.FOCUS_AREA_LANGUAGE,
      //   value: ApplicationConstants.FOCUS_AREA_LANGUAGE_ES_CODE_STRING,
      //   value_display_string: ApplicationConstants.FOCUS_AREA_LANGUAGE_ES_DISPLAY_STRING
      // },
      {
        focus_area: ApplicationConstants.FOCUS_AREA_CITY,
        value: ApplicationConstants.FOCUS_AREA_CITY_NYC_CODE_STRING,
        value_display_string: ApplicationConstants.FOCUS_AREA_CITY_NYC_DISPLAY_STRING
      },
      {
        focus_area: ApplicationConstants.FOCUS_AREA_CITY,
        value: ApplicationConstants.FOCUS_AREA_CITY_DELHI_CODE_STRING,
        value_display_string: ApplicationConstants.FOCUS_AREA_CITY_DELHI_DISPLAY_STRING
      },
      {
        focus_area: ApplicationConstants.FOCUS_AREA_CITY,
        value: ApplicationConstants.FOCUS_AREA_CITY_PARIS_CODE_STRING,
        value_display_string: ApplicationConstants.FOCUS_AREA_CITY_PARIS_DISPLAY_STRING
      },
      {
        focus_area: ApplicationConstants.FOCUS_AREA_CITY,
        value: ApplicationConstants.FOCUS_AREA_CITY_BANGKOK_CODE_STRING,
        value_display_string: ApplicationConstants.FOCUS_AREA_CITY_BANGKOK_DISPLAY_STRING
      },
      {
        focus_area: ApplicationConstants.FOCUS_AREA_CITY,
        value: ApplicationConstants.FOCUS_AREA_CITY_MEXICO_CITY_CODE_STRING,
        value_display_string: ApplicationConstants.FOCUS_AREA_CITY_MEXICO_CITY_DISPLAY_STRING
      }
    ];
  }
}
