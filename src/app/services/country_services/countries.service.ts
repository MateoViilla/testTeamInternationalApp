import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CountriesService {
  selectedCountry: String;
  countries: String[];
  readonly baseURL = 'https://restcountries.eu/rest/v2';

  constructor(private http: HttpClient) { }

  getCountryList() {
    return this.http.get(this.baseURL+ '/all');
  }

}
