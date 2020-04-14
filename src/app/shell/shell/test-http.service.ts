import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestHttpService {
  constructor(private httpClient: HttpClient) {}

  getTest(): Observable<{ api: string }> {
    return this.httpClient.get<{ api: string }>('/v1/items/public/test');
  }
}
