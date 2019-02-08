import {Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FilterInputModel} from '../../query/filters/filter-input-model';
import {FilterInputModelGenerator} from '../../query/filters/filter-input-model-generator';
import {FilterType} from '../../query/filters/filter-type';
import {BsDatepickerConfig} from 'ngx-bootstrap';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit, OnChanges {
  selectedLanguage: FilterInputModel;
  selectedCity: FilterInputModel;
  selectedTopic: FilterInputModel;
  selectedSort: FilterInputModel;
  filterInputModelListOfCity: FilterInputModel[] = [];
  filterInputModelListOfLanguage: FilterInputModel[] = [];
  filterInputModelListOfTopic: FilterInputModel[] = [];
  sortInputModelList: FilterInputModel[] = [];
  filtersEventObjectList: FilterInputModel[] = [];

  @Output() filtersEvent: EventEmitter<FilterInputModel[]> = new EventEmitter<FilterInputModel[]>();
  @Output() clearEvent: EventEmitter<string> = new EventEmitter<string>();
  bsConfig: Partial<BsDatepickerConfig>;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  daterangepickerModel: Date[];
  clearDate: string;
  constructor() {
    this.bsConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        // dateInputFormat: 'yyyy-mm-ddThh:mm:ssZ',
        // rangeInputFormat: 'YYYY-MM-DDT hh:mm:ssZ'
      });
    this.maxDate.setDate(this.maxDate.getDate());
    this.bsRangeValue = [this.bsValue, this.maxDate];
    this.clearDate = 'Select a date';
  }

  ngOnInit() {
    this.filterInputModelListOfCity = FilterInputModelGenerator.getListOfInputModels(FilterType.FILTER_TYPE_CITY);
    this.filterInputModelListOfLanguage = FilterInputModelGenerator.getListOfInputModels(FilterType.FILTER_TYPE_LANGUAGE);
    this.filterInputModelListOfTopic = FilterInputModelGenerator.getListOfInputModels(FilterType.FILTER_TYPE_TOPIC);
    this.sortInputModelList = FilterInputModelGenerator.getListOfInputModels(FilterType.FILTER_TYPE_SORT);
  }

  selectNewCity(city: FilterInputModel) {
    let isAlreadySelected: Boolean = false;
    this.filtersEventObjectList.forEach(filtersEventObject => {
      if (filtersEventObject != null && filtersEventObject.filter_type === FilterType.FILTER_TYPE_CITY) {
        filtersEventObject.code = city.code;
        filtersEventObject.display = city.display;
        this.filtersEvent.emit(this.filtersEventObjectList);
        this.selectedCity = city;
        isAlreadySelected = true;
        return;
      }
    });
    if (!isAlreadySelected) {
      this.filtersEventObjectList.push(new FilterInputModel(city.display, city.code, city.filter_type));
      this.filtersEvent.emit(this.filtersEventObjectList);
      this.selectedCity = city;
      return;
    }

  }

  selectSortOrder(sortOption: FilterInputModel) {
    let isAlreadySelected: Boolean = false;
    this.filtersEventObjectList.forEach(filtersEventObject => {
      if (filtersEventObject != null && filtersEventObject.filter_type === FilterType.FILTER_TYPE_SORT) {
        filtersEventObject.code = sortOption.code;
        filtersEventObject.display = sortOption.display;
        this.filtersEvent.emit(this.filtersEventObjectList);
        this.selectedSort = sortOption;
        isAlreadySelected = true;
        return;
      }
    });
    if (!isAlreadySelected) {
      this.filtersEventObjectList.push(new FilterInputModel(sortOption.display, sortOption.code, sortOption.filter_type));
      this.filtersEvent.emit(this.filtersEventObjectList);
      this.selectedSort = sortOption;
      return;
    }

  }

  selectNewLanguage(language: FilterInputModel) {
    let isAlreadySelected: Boolean = false;
    this.filtersEventObjectList.forEach(filtersEventObject => {
      if (filtersEventObject != null && filtersEventObject.filter_type === FilterType.FILTER_TYPE_LANGUAGE) {
        filtersEventObject.code = language.code;
        filtersEventObject.display = language.display;
        this.filtersEvent.emit(this.filtersEventObjectList);
        this.selectedLanguage = language;
        isAlreadySelected = true;
        return;
      }
    });
    if (!isAlreadySelected) {
      this.filtersEventObjectList.push(new FilterInputModel(language.display, language.code, language.filter_type));
      this.filtersEvent.emit(this.filtersEventObjectList);
      this.selectedLanguage = language;
      return;
    }
  }

  selectNewTopic(topic: FilterInputModel) {
    let isAlreadySelected: Boolean = false;
    this.filtersEventObjectList.forEach(filtersEventObject => {
      if (filtersEventObject != null && filtersEventObject.filter_type === FilterType.FILTER_TYPE_TOPIC) {
        filtersEventObject.code = topic.code;
        filtersEventObject.display = topic.display;
        this.filtersEvent.emit(this.filtersEventObjectList);
        this.selectedTopic = topic;
        isAlreadySelected = true;
        return;
      }
    });
    if (!isAlreadySelected) {
      this.filtersEventObjectList.push(new FilterInputModel(topic.display, topic.code, topic.filter_type));
      this.filtersEvent.emit(this.filtersEventObjectList);
      this.selectedTopic = topic;
      return;
    }
  }

  clearText(value) {
    const filtersLength = this.filtersEventObjectList.length;
    let selectedIndex = -1;
    if (value === 'topic') {
      this.selectedTopic = null;
      for (let index = 0; index < filtersLength; index++) {
        if (this.filtersEventObjectList[index] != null
          && this.filtersEventObjectList[index].filter_type === FilterType.FILTER_TYPE_TOPIC) {
          selectedIndex = index;
          break;
        }
      }
    }

    if (value === 'city') {
      this.selectedCity = null;
      for (let index = 0; index < filtersLength; index++) {
        if (this.filtersEventObjectList[index] != null
          && this.filtersEventObjectList[index].filter_type === FilterType.FILTER_TYPE_CITY) {
          selectedIndex = index;
          break;
        }
      }
    }
    if (value === 'language') {
      this.selectedLanguage = null;
      for (let index = 0; index < filtersLength; index++) {
        if (this.filtersEventObjectList[index] != null
          && this.filtersEventObjectList[index].filter_type === FilterType.FILTER_TYPE_LANGUAGE) {
          selectedIndex = index;
          break;
        }
      }
    }
    if (value === 'date') {
      this.clearDate.concat('Select a date');
      for (let index = 0; index < filtersLength; index++) {
        if (this.filtersEventObjectList[index] != null
          && this.filtersEventObjectList[index].filter_type === FilterType.FILTER_TYPE_DATE_RANGE) {
          selectedIndex = index;
          break;
        }
      }
    }
    if (value === 'sort') {
      this.selectedSort = null;
      for (let index = 0; index < filtersLength; index++) {
        if (this.filtersEventObjectList[index] != null
          && this.filtersEventObjectList[index].filter_type === FilterType.FILTER_TYPE_SORT) {
          selectedIndex = index;
          break;
        }
      }
    }
    if (value === 'all') {
      this.clearDate = 'Select a date';
      this.selectedLanguage = null;
      this.selectedCity = null;
      this.selectedTopic = null;
      this.selectedSort = null;
      this.filtersEventObjectList = [];
      this.filtersEvent.emit(this.filtersEventObjectList);
    }
    if (selectedIndex > -1) {
      this.filtersEventObjectList[selectedIndex] = null;
      this.filtersEvent.emit(this.filtersEventObjectList);
    }
  }

  formatDatesToSolrDateRange(dateRange: Date[]): string {
    const dateStrings = [];
    dateRange.forEach(date => {
      const dateValue = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      const formatedDate = new Date(year, month, dateValue, 0, 0, 0, 0);
      console.log(formatedDate);
      let isoString = formatedDate.toISOString();
      isoString = this.replaceAt(isoString, isoString.indexOf('T') + 1, '0');
      isoString = this.replaceAt(isoString, isoString.indexOf('T') + 2, '0');
      dateStrings.push(isoString);
    });
    return '[' + dateStrings[0] + ' TO ' + dateStrings[1] + ']';
  }
  replaceAt = function(string: string, index, replacement) {
    return string.substring(0, index) + replacement + string.substring(index + replacement.length);
  };
  onDateChange(event) {
    console.log(this.formatDatesToSolrDateRange(this.daterangepickerModel));
    let isAlreadySelected: Boolean = false;
    this.filtersEventObjectList.forEach(filtersEventObject => {
      if (filtersEventObject != null && filtersEventObject.filter_type === FilterType.FILTER_TYPE_DATE_RANGE) {
        filtersEventObject.code = this.formatDatesToSolrDateRange(this.daterangepickerModel);
        this.filtersEvent.emit(this.filtersEventObjectList);
        // this.selectedTopic = topic;
        isAlreadySelected = true;
        return;
      }
    });
    if (!isAlreadySelected) {
      this.filtersEventObjectList.push(new FilterInputModel('',
        this.formatDatesToSolrDateRange(this.daterangepickerModel)
        ,  FilterType.FILTER_TYPE_DATE_RANGE));
      this.filtersEvent.emit(this.filtersEventObjectList);
      // this.selectedTopic = topic;
      return;
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        if (propName === 'daterangepickerModel') {
          const change  = changes[propName];
          let isAlreadySelected: Boolean = false;
          this.filtersEventObjectList.forEach(filtersEventObject => {
            if (filtersEventObject != null && filtersEventObject.filter_type === FilterType.FILTER_TYPE_DATE_RANGE) {
              // filtersEventObject.code = topic.code;
              // filtersEventObject.display = topic.display;
              this.filtersEvent.emit(this.filtersEventObjectList);
              // this.selectedTopic = topic;
              isAlreadySelected = true;
              return;
            }
          });
          if (!isAlreadySelected) {
            // this.filtersEventObjectList.push(new FilterInputModel(topic.display, topic.code, topic.filter_type));
            // this.filtersEvent.emit(this.filtersEventObjectList);
            // this.selectedTopic = topic;
            return;
          }
        }
      }
    }
  }
}
