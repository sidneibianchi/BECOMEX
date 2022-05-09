import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/Country';

@Injectable()
export class CountryService {

  baseUrl = 'http://localhost:5000/api/countries';

  constructor(private http: HttpClient) { }

  public getAllCoutries(): Observable<Country[]>{
    return this.http.get<Country[]>(this.baseUrl);
  }

}
