import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestHttpService {

  constructor(private httpClient: HttpClient) {

  }

  getTest(): Observable<any> {
    return this.httpClient.get<any>('/v1/items/public/test');
  }

  getTest1(): Observable<any> {
    return this.httpClient.get<any>('v1/items/public/test');
  }
}
