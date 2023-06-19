import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Data source. Injectable used to provided entity services with proper
 * configuration, such as URI, headers or pipes.
 */
@Injectable({
  providedIn: 'root',
})
export class DatasourceService {
  /** API URL dependant on the environment. */
  public static readonly URL = environment.api;

  /**
   * Datasource service.
   *
   * @param http The {@link HttpClient}
   */
  constructor(private http: HttpClient) {}

  /**
   * Get request to the api, returning text.
   *
   * @template T The type of the expected json response
   * @param path The request path
   * @param params Additionnal HttpParams
   * @returns An `Observable<T>` of the response, with the response body of type
   *   T
   */
  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${DatasourceService.URL}${path}`, {
      responseType: 'json',
      params: params,
    });
  }

  /**
   * Put request to the api, returning text.
   *
   * @param path The request path
   * @param params Additionnal HttpParams
   * @returns An `Observable<string>` of the response, with the response body of
   *   type text
   */
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
