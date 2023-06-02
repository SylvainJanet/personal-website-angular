import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatasourceTestService {
  public static readonly URL = 'https://server.sylvainjanet.fr/test/';

  constructor(private http: HttpClient) {}

  get(path: string): Observable<string> {
    return this.http.get<string>(`${DatasourceTestService.URL}${path}`);
  }
}
