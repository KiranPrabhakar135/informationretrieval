import {Query} from '../../model/query';
import {FilterInputModel} from '../filters/filter-input-model';

export class FacetInput {
  query: string;
  queryObj: Query;
  filterQuery?: FilterInputModel[];


  constructor(query: string, queryObj: Query, filterQuery: FilterInputModel[]) {
    this.query = query;
    this.queryObj = queryObj;
    this.filterQuery = filterQuery;
  }
}
