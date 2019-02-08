export class ApplicationConstants {
  static readonly FOCUS_AREA_TOPIC = 'queryMetadata.query_topic';
  static readonly FOCUS_AREA_LANGUAGE = 'queryMetadata.query_language';
  static readonly FOCUS_AREA_CITY = 'queryMetadata.query_city';
  static readonly FOCUS_AREA_DATERANGE = 'created_at';
  static readonly RE_TWEET_COUNT = 'retweet_count';
  static readonly FAVORITE_COUNT = 'favorite_count';

  static readonly FOCUS_AREA_TOPIC_STRING = 'Topic';
  static readonly FOCUS_AREA_LANGUAGE_STRING = 'Language';
  static readonly FOCUS_AREA_CITY_STRING = 'City';

  static readonly DATE_RANGE_100_DAYS = '[NOW-3MONTHS TO NOW]';
  static readonly DATE_RANGE_6_MONTHS = '[NOW-6MONTHS TO NOW]';
  static readonly DATE_RANGE_12_MONTHS = '[NOW-12MONTHS TO NOW]';

  static readonly DATE_RANGE_100_DAYS_STRING = 'Past 3 months';
  static readonly DATE_RANGE_6_MONTHS_STRING = 'Past 6 months';
  static readonly DATE_RANGE_12_MONTHS_STRING = 'Past 12 months';


  static readonly FOCUS_AREA_TOPIC_ENVIRONMENT_DISPLAY_STRING = 'Environment';
  static readonly FOCUS_AREA_TOPIC_POLITICS_DISPLAY_STRING = 'Politics';
  static readonly FOCUS_AREA_TOPIC_CRIME_DISPLAY_STRING = 'Crime';
  static readonly FOCUS_AREA_TOPIC_SOCIAL_UNREST_DISPLAY_STRING = 'Social Unrest';
  static readonly FOCUS_AREA_TOPIC_INFRASTRUCTURE_DISPLAY_STRING = 'Infrastructure';
  static readonly FOCUS_AREA_TOPIC_INFRASTRUCTURE_CODE_STRING = 'infra';

  static readonly FOCUS_AREA_LANGUAGE_EN_CODE_STRING = 'en';
  static readonly FOCUS_AREA_LANGUAGE_ES_CODE_STRING = 'es';
  static readonly FOCUS_AREA_LANGUAGE_FR_CODE_STRING = 'fr';
  static readonly FOCUS_AREA_LANGUAGE_TH_CODE_STRING = 'th';
  static readonly FOCUS_AREA_LANGUAGE_HI_CODE_STRING = 'hi';

  static readonly FOCUS_AREA_LANGUAGE_EN_DISPLAY_STRING = 'English';
  static readonly FOCUS_AREA_LANGUAGE_ES_DISPLAY_STRING = 'Spanish';
  static readonly FOCUS_AREA_LANGUAGE_FR_DISPLAY_STRING = 'French';
  static readonly FOCUS_AREA_LANGUAGE_TH_DISPLAY_STRING = 'Thai';
  static readonly FOCUS_AREA_LANGUAGE_HI_DISPLAY_STRING = 'Hindi';

  static readonly FOCUS_AREA_CITY_NYC_CODE_STRING = 'nyc';
  static readonly FOCUS_AREA_CITY_DELHI_CODE_STRING = 'delhi';
  static readonly FOCUS_AREA_CITY_PARIS_CODE_STRING = 'paris';
  static readonly FOCUS_AREA_CITY_BANGKOK_CODE_STRING = 'bangkok';
  static readonly FOCUS_AREA_CITY_MEXICO_CITY_CODE_STRING = 'mexico city';

  static readonly FOCUS_AREA_CITY_NYC_DISPLAY_STRING = 'New York City';
  static readonly FOCUS_AREA_CITY_DELHI_DISPLAY_STRING = 'Delhi';
  static readonly FOCUS_AREA_CITY_PARIS_DISPLAY_STRING = 'Paris';
  static readonly FOCUS_AREA_CITY_BANGKOK_DISPLAY_STRING = 'Bangkok';
  static readonly FOCUS_AREA_CITY_MEXICO_CITY_DISPLAY_STRING = 'Mexico City';

  static readonly SORT_BY_CREATED_AT_DISPLAY_STRING = 'Created at';
  static readonly SORT_BY_RE_TWEETED_COUNT_DISPLAY_STRING = 'Re-tweeted Count';
  static readonly SORT_BY_FAVORITE_COUNT_DISPLAY_STRING = 'Favorite Count';

  static getFormattedLanguageName(langName: string) {
    console.log('getFormattedLanguageName Language name: ' + langName);
    switch (langName) {
      case ApplicationConstants.FOCUS_AREA_LANGUAGE_EN_CODE_STRING:
        return ApplicationConstants.FOCUS_AREA_LANGUAGE_EN_DISPLAY_STRING;
      case ApplicationConstants.FOCUS_AREA_LANGUAGE_HI_CODE_STRING:
        return ApplicationConstants.FOCUS_AREA_LANGUAGE_HI_DISPLAY_STRING;
      case ApplicationConstants.FOCUS_AREA_LANGUAGE_ES_CODE_STRING:
        return ApplicationConstants.FOCUS_AREA_LANGUAGE_ES_DISPLAY_STRING;
      case ApplicationConstants.FOCUS_AREA_LANGUAGE_FR_CODE_STRING:
        return ApplicationConstants.FOCUS_AREA_LANGUAGE_FR_DISPLAY_STRING;
      case ApplicationConstants.FOCUS_AREA_LANGUAGE_TH_CODE_STRING:
        return ApplicationConstants.FOCUS_AREA_LANGUAGE_TH_DISPLAY_STRING;
    }
  }


  static getFormattedCityName(cityName: string) {
    switch (cityName) {
      case ApplicationConstants.FOCUS_AREA_CITY_NYC_CODE_STRING:
        return ApplicationConstants.FOCUS_AREA_CITY_NYC_DISPLAY_STRING;
      case ApplicationConstants.FOCUS_AREA_CITY_DELHI_CODE_STRING:
        return ApplicationConstants.FOCUS_AREA_CITY_DELHI_DISPLAY_STRING;
      case ApplicationConstants.FOCUS_AREA_CITY_PARIS_CODE_STRING:
        return ApplicationConstants.FOCUS_AREA_CITY_PARIS_DISPLAY_STRING;
      case ApplicationConstants.FOCUS_AREA_CITY_BANGKOK_CODE_STRING:
        return ApplicationConstants.FOCUS_AREA_CITY_BANGKOK_DISPLAY_STRING;
      case ApplicationConstants.FOCUS_AREA_CITY_MEXICO_CITY_CODE_STRING:
        return ApplicationConstants.FOCUS_AREA_CITY_MEXICO_CITY_DISPLAY_STRING;
      case 'mexico':
        return ApplicationConstants.FOCUS_AREA_CITY_MEXICO_CITY_DISPLAY_STRING;
    }
  }

  static getFormattedTopicName(topicName: string) {
    switch (topicName) {
      case 'environment':
        return ApplicationConstants.FOCUS_AREA_TOPIC_ENVIRONMENT_DISPLAY_STRING;
      case 'politics':
        return ApplicationConstants.FOCUS_AREA_TOPIC_POLITICS_DISPLAY_STRING;
      case 'crime':
        return ApplicationConstants.FOCUS_AREA_TOPIC_CRIME_DISPLAY_STRING;
      case 'social unrest':
        return ApplicationConstants.FOCUS_AREA_TOPIC_SOCIAL_UNREST_DISPLAY_STRING;
      case 'infra':
        return ApplicationConstants.FOCUS_AREA_TOPIC_INFRASTRUCTURE_DISPLAY_STRING;
      case 'social':
        return ApplicationConstants.FOCUS_AREA_TOPIC_SOCIAL_UNREST_DISPLAY_STRING;
    }
  }
}
