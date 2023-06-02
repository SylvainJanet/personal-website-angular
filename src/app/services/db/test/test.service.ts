import { Injectable } from '@angular/core';
import { DatasourceTestService } from '../datasource-test/datasource-test.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private dataSource: DatasourceTestService) {}

  hello(): Observable<string> {
    return this.dataSource.get('hello');
  }
}
