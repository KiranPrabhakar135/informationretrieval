export interface DateFacetTopicChart {
  responseHeader: ResponseHeader;
  response: Response;
  facet_counts: FacetCounts;
}

export interface FacetCounts {
  facet_queries: {};
  facet_fields: TopicFacetFields;
  facet_ranges: {};
  facet_intervals: {};
  facet_heatmaps: {};
}

export interface TopicFacetFields {
  'queryMetadata.query_topic': FacetCount[];
  'queryMetadata.query_language': FacetCount[];
  'queryMetadata.query_city': FacetCount[];
}

export interface FacetCount {

  name: string;
  type: string;
  value: number;
}

export interface Response {
  numFound: number;
  start: number;
  docs: [];
}

export interface ResponseHeader {
  status: number;
  QTime: number;
  params: Params;
}

export interface Params {
  q: string;
  'facet.field': string;
  'json.nl': string;
  indent: string;
  fq: string;
  rows: string;
  facet: string;
  wt: string;
}
