import { Injectable } from '@angular/core';
import { DatasourceService } from '../datasource/datasource-test.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private dataSource: DatasourceService) {}

  hello(): Observable<string> {
    return this.dataSource.get('hello');
  }

  sendMessage(): Observable<string> {
    const params = new HttpParams().set(
      'content',
      'This content was set from the front end'
    );
    return this.dataSource.put('add-message', params);
  }
}
