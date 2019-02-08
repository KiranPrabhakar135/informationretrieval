import {ChartInputModel} from './chart-input-model';
import {ApplicationConstants} from '../../util/application-constants';

export class ChartInputModelGenerator {
  public static getListOfInputModels(): ChartInputModel[] {
    return [
      {
        focus_area: ApplicationConstants.FOCUS_AREA_TOPIC,
        focus_area_string: ApplicationConstants.FOCUS_AREA_TOPIC_STRING,
        date_range: ApplicationConstants.DATE_RANGE_12_MONTHS,
        date_range_string: ApplicationConstants.DATE_RANGE_12_MONTHS_STRING,

      },
      {
        focus_area: ApplicationConstants.FOCUS_AREA_TOPIC,
        focus_area_string: ApplicationConstants.FOCUS_AREA_TOPIC_STRING,
        date_range: ApplicationConstants.DATE_RANGE_6_MONTHS,
        date_range_string: ApplicationConstants.DATE_RANGE_6_MONTHS_STRING,

      },
      {
        focus_area: ApplicationConstants.FOCUS_AREA_TOPIC,
        focus_area_string: ApplicationConstants.FOCUS_AREA_TOPIC_STRING,
        date_range: ApplicationConstants.DATE_RANGE_100_DAYS,
        date_range_string: ApplicationConstants.DATE_RANGE_100_DAYS_STRING,

      },


      {
        focus_area: ApplicationConstants.FOCUS_AREA_CITY,
        focus_area_string: ApplicationConstants.FOCUS_AREA_CITY_STRING,
        date_range: ApplicationConstants.DATE_RANGE_12_MONTHS,
        date_range_string: ApplicationConstants.DATE_RANGE_12_MONTHS_STRING,

      },
      {
        focus_area: ApplicationConstants.FOCUS_AREA_CITY,
        focus_area_string: ApplicationConstants.FOCUS_AREA_CITY_STRING,
        date_range: ApplicationConstants.DATE_RANGE_6_MONTHS,
        date_range_string: ApplicationConstants.DATE_RANGE_6_MONTHS_STRING,

      },

      {
        focus_area: ApplicationConstants.FOCUS_AREA_CITY,
        focus_area_string: ApplicationConstants.FOCUS_AREA_CITY_STRING,
        date_range: ApplicationConstants.DATE_RANGE_100_DAYS,
        date_range_string: ApplicationConstants.DATE_RANGE_100_DAYS_STRING,

      },


      {
        focus_area: ApplicationConstants.FOCUS_AREA_LANGUAGE,
        focus_area_string: ApplicationConstants.FOCUS_AREA_LANGUAGE_STRING,
        date_range: ApplicationConstants.DATE_RANGE_12_MONTHS,
        date_range_string: ApplicationConstants.DATE_RANGE_12_MONTHS_STRING,

      },
      {
        focus_area: ApplicationConstants.FOCUS_AREA_LANGUAGE,
        focus_area_string: ApplicationConstants.FOCUS_AREA_LANGUAGE_STRING,
        date_range: ApplicationConstants.DATE_RANGE_6_MONTHS,
        date_range_string: ApplicationConstants.DATE_RANGE_6_MONTHS_STRING,

      },

      {
        focus_area: ApplicationConstants.FOCUS_AREA_LANGUAGE,
        focus_area_string: ApplicationConstants.FOCUS_AREA_LANGUAGE_STRING,
        date_range: ApplicationConstants.DATE_RANGE_100_DAYS,
        date_range_string: ApplicationConstants.DATE_RANGE_100_DAYS_STRING,

      },
    ];
  }
}
