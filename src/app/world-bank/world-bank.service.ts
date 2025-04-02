import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WorldBankService {
  private baseUrl = 'https://api.worldbank.org/v2';  

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    const url = `${this.baseUrl}/country?format=json`;
    console.log(`Fetching countries from: ${url}`);
    return this.http.get<any>(url).pipe(
      tap(data => console.log('Countries fetched:', data)),
      catchError(error => {
        console.error('Error fetching countries:', error);
        return throwError(() => new Error('Failed to fetch countries'))
      })
    );
  }

  getCountryMetadata(countryCode: string): Observable<any> {
    const url = `${this.baseUrl}/country/${countryCode}?format=json`;
    console.log(`Fetching metadata for country ${countryCode} from: ${url}`);
    return this.http.get<any>(url).pipe(
      tap(data => console.log('Country Metadata Response:', data)),
      catchError(error => {
        console.error('Error fetching country metadata:', error);
        return throwError(() => new Error('Failed to fetch country metadata'));
      })
    );
  }

  getCountryData(countryCode: string): Observable<any> {
    const indicators = [
      'SP.POP.TOTL', //population
    ];
    const url = `${this.baseUrl}/country/${countryCode}/indicator/${indicators.join(';')}?format=json&date=2020:2023`;
    console.log(`Fetching data for country ${countryCode} from: ${url}`); 
    return this.http.get<any>(url).pipe(
      tap(data => console.log('Country Data Response:', data)),
      catchError(error => {
        console.error('Error fetching country data:', error);
        return throwError(() => new Error('Failed to fetch country data'));
      })
    );
  }
}