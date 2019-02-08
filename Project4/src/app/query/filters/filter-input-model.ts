import {FilterType} from './filter-type';

export class FilterInputModel {
  display: string;
  code: string;
  filter_type: FilterType;
  // date_range: Date[];

  constructor(display: string, code: string, filter_type: FilterType) {
    this.display = display;
    this.code = code;
    this.filter_type = filter_type;
    // this.date_range = date_range;
  }
}
