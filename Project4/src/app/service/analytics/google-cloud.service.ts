import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {QueryResponse} from '../../model/query-result';
import {GoogleCloudConstants} from '../../util/url-constants';

// import * as language from '@google-cloud/language';

@Injectable({
  providedIn: 'root'
})
export class GoogleCloudService {

  constructor(private httpClient: HttpClient) {
  }

  getScore(tweet): Observable<QueryResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    const data = {'document': {'type': 'PLAIN_TEXT', 'content': tweet.text[0]}, 'encodingType': 'UTF8'};
    return this.httpClient.post<QueryResponse>('https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyD8RcyaQF5bSMfgVVhXG36JdOOTYPqerIY', data, {headers: headers});
  }

}
