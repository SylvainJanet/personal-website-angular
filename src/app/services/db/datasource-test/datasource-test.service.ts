import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatasourceTestService {
  public static readonly URL = 'https://server.sylvainjanet.fr/test/';

  constructor(private http: HttpClient) {}

  get(path: string): Observable<string> {
    return this.http.get(`${DatasourceTestService.URL}${path}`, {
      responseType: 'text',
    });
  }

  put(path: string, params: HttpParams): Observable<string> {
    return this.http
      .put(`${DatasourceTestService.URL}${path}`, {
        params: params,
      })
      .pipe(
        map((e) => {
          return JSON.stringify(e);
        })
      );
  }
}
