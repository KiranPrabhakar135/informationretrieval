export interface HashtagFacetChart {
  responseHeader: ResponseHeader;
  response: Response;
  facet_counts: FacetCounts;
}

export interface FacetCounts {
  facet_queries: {};
  facet_fields: HashtagFacetFields;
  facet_ranges: {};
  facet_intervals: {};
  facet_heatmaps: {};
}

export interface HashtagFacetFields {
  hashtags: FacetCount[];
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
