import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { IEnvironment } from 'src/environments/interface/ienvironment';

/**
 * Data source. Injectable used to provided entity services with proper
 * configuration, such as URI, headers or pipes.
 */
@Injectable({
  providedIn: 'root',
})
export class DatasourceService {
  /** API URL dependant on the environment. */
  public readonly URL: string;

  /**
   * Datasource service.
   *
   * @param http The {@link HttpClient}
   */
  constructor(
    @Inject(ENV) private environment: IEnvironment,
    private http: HttpClient
  ) {
    this.URL = this.environment.api;
  }

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
    return this.http.get<T>(`${this.URL}${path}`, {
      responseType: 'json',
      params: params,
    });
  }
}
