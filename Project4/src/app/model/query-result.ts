export interface QueryResponse {
  response: Response;
}

export interface Response {
  numFound: number;
  start: number;
  docs: Tweet[];
}

export interface Tweet {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  text_filtered: string;
  'user.id': number;
  full_text: string;
  truncated: boolean;
  'entities.hashtags.text': string;
  'entities.urls.display_url': string;
  'user.profile_image_url': string;
  'user.name': string;
  'user.screen_name': string;
  'queryMetadata.query_city': string;
  'queryMetadata.query_topic': string;
  'queryMetadata.query_language': string;
  entities: TweetEntities;
  source: string;
  in_reply_to_status_id: number | null;
  in_reply_to_status_id_str: null | string;
  in_reply_to_user_id: number | null;
  in_reply_to_user_id_str: null | string;
  in_reply_to_screen_name: null | string;
  // user: User;
  geo: null;
  coordinates: null;
  place: null;
  contributors: null;
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  lang: string;
  quoted_status_id?: number;
  quoted_status_id_str?: string;
  quoted_status?: QuotedStatus;
  possibly_sensitive?: boolean;
  retweeted_status?: RetweetedStatus;
  extended_entities?: TweetExtendedEntities;
  queryMetadata?: QueryMetadata;
}

export interface TweetEntities {
  hashtags: Hashtag[];
  symbols: any[];
  user_mentions: UserMention[];
  urls: URL[];
  media?: EntitiesMedia[];
}

export interface Hashtag {
  text: string;
  indices: number[];
}

export interface EntitiesMedia {
  id: number;
  id_str: string;
  indices: number[];
  media_url: string;
  media_url_https: string;
  url: string;
  display_url: string;
  expanded_url: string;
  type: string;
  sizes: Sizes;
  source_status_id?: number;
  source_status_id_str?: string;
  source_user_id?: number;
  source_user_id_str?: string;
}

export interface Sizes {
  thumb: Large;
  small: Large;
  medium: Large;
  large: Large;
}

export interface Large {
  w: number;
  h: number;
  resize: string;
}

export interface URL {
  url: string;
  expanded_url: string;
  display_url: string;
  indices: number[];
}

export interface UserMention {
  screen_name: string;
  name: string;
  id: number;
  id_str: string;
  indices: number[];
}

export interface TweetExtendedEntities {
  media: EntitiesMedia[];
}

export interface QuotedStatus {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  truncated: boolean;
  entities: TweetEntities;
  source: string;
  in_reply_to_status_id: null;
  in_reply_to_status_id_str: null;
  in_reply_to_user_id: null;
  in_reply_to_user_id_str: null;
  in_reply_to_screen_name: null;
  user: User;
  geo: null;
  coordinates: null;
  place: Place | null;
  contributors: null;
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  possibly_sensitive: boolean;
  lang: string;
}

export interface Place {
  id: string;
  url: string;
  place_type: string;
  name: string;
  full_name: string;
  country_code: string;
  country: string;
  contained_within: any[];
  bounding_box: BoundingBox;
}

export interface BoundingBox {
  type: string;
  coordinates: Array<Array<number[]>>;
}

export interface User {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  location: string;
  description: string;
  url: null | string;
  entities: UserEntities;
  protected: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  created_at: string;
  favourites_count: number;
  utc_offset: null;
  time_zone: null;
  geo_enabled: boolean;
  verified: boolean;
  statuses_count: number;
  status: Tweet;
  lang: string;
  contributors_enabled: boolean;
  is_translator: boolean;
  is_translation_enabled: boolean;
  profile_background_color: string;
  profile_background_image_url: string;
  profile_background_image_url_https: string;
  profile_background_tile: boolean;
  profile_image_url: string;
  profile_image_url_https: string;
  profile_banner_url?: string;
  profile_link_color: string;
  profile_sidebar_border_color: string;
  profile_sidebar_fill_color: string;
  profile_text_color: string;
  profile_use_background_image: boolean;
  has_extended_profile: boolean;
  default_profile: boolean;
  default_profile_image: boolean;
  following: null;
  follow_request_sent: null;
  notifications: null;
  translator_type: string;
}

export interface UserEntities {
  url?: Description;
  description: Description;
}

export interface Description {
  urls: URL[];
}

export interface RetweetedStatus {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  truncated: boolean;
  entities: TweetEntities;
  source: string;
  in_reply_to_status_id: null;
  in_reply_to_status_id_str: null;
  in_reply_to_user_id: null;
  in_reply_to_user_id_str: null;
  in_reply_to_screen_name: null;
  user: User;
  geo: null;
  coordinates: null;
  place: null;
  contributors: null;
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  possibly_sensitive: boolean;
  lang: string;
  extended_entities?: RetweetedStatusExtendedEntities;
}

export interface RetweetedStatusExtendedEntities {
  media: Media1[];
}

export interface Media1 {
  id: number;
  id_str: string;
  indices: number[];
  media_url: string;
  media_url_https: string;
  url: string;
  display_url: string;
  expanded_url: string;
  type: string;
  sizes: Sizes;
}

export interface IUserTimelineOptions extends ITimelineOptions {
  user_id?: number;
  screen_name?: string;
  include_rts?: boolean;
}

export interface IHomeTimelineOptions extends ITimelineOptions {
  include_entities?: boolean;
}

export interface TweetSearchResult {
  statuses: Array<Tweet>;
}

export interface SearchMetadata extends IBaseApiCall {
  completed_in: number;
  max_id: number;
  max_id_str: string;
  next_results: string;
  query: string;
  count: number;
  since_id: number;
  since_id_str: string;
}

export interface ITimelineOptions extends IBaseApiCall {
  since_id?: string;
  count?: number;
  max_id?: string;
  trim_user?: boolean;
  exclude_replies?: boolean;
}

export interface IUserLookup extends IBaseApiCall {
  user_id?: number;
  screen_name?: string;
  include_entities?: boolean;
}

export interface ITweetSearch extends ISearch {
  geocode?: string;
  lan?: string;
  locale?: string;
  result_type?: string;
  until?: string;
  since_id?: string;
}

export interface ISearch extends IBaseApiCall {
  q: string;
  page?: number;
  count?: number;
  include_entities?: boolean;
}

export interface IBaseApiCall {
  tweet_mode?: string;
}

class QueryMetadata {
  public query: string;

  public query_time: number;

  public query_topic: string;

  public query_city: string;

  public query_language: string;

  public query_city_range: string;

  public constructor(query: string, queryTime: number, queryTopic: string, queryCity: string, queryLanguage: string
    , queryCityRange: string) {
    this.query = null;
    this.query_time = 0;
    this.query_topic = null;
    this.query_city = null;
    this.query_language = null;
    this.query_city_range = null;
    this.query = query;
    this.query_time = queryTime;
    this.query_topic = queryTopic;
    this.query_city = queryCity;
    this.query_language = queryLanguage;
    this.query_city_range = queryCityRange;
  }
}
// Converts JSON strings to/from your types
export namespace Convert {
  export function toTweet(json: string): Tweet[] {
    return JSON.parse(json);
  }

  export function tweetToJson(value: Tweet[]): string {
    return JSON.stringify(value, null, 2);
  }
}
