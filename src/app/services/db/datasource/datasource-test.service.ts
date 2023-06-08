import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DatasourceService {
  public static readonly URL = environment.api;

  constructor(private http: HttpClient) {}

  get(path: string, params: HttpParams = new HttpParams()): Observable<string> {
    return this.http.get(`${DatasourceService.URL}${path}`, {
      responseType: 'text',
      params: params,
    });
  }

  put(path: string, params: HttpParams): Observable<string> {
    return this.http
      .put(`${DatasourceService.URL}${path}`, {
        params: params,
      })
      .pipe(
        map((e) => {
          return JSON.stringify(e);
        })
      );
  }
}
