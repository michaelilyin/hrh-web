import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '@hrh/sdk/api/page.model';
import { CurrentHouse, House, HouseCreate } from '../_models/house.model';
import { map } from 'rxjs/operators';
import { Value } from '@hrh/sdk/api/value.model';

const routes = {
  houses: () => '/v1/houses',
  currentHouses: () => `${routes.houses()}`,
  currentHousesCount: () => `${routes.currentHouses()}/count`,
  houseById: (id: string) => `${routes.houses()}/${id}`
};

@Injectable({
  providedIn: 'root'
})
export class HousesService {
  constructor(private httpClient: HttpClient) {}

  getCurrentUserHouses(): Observable<ReadonlyArray<CurrentHouse>> {
    return this.httpClient.get<Page<CurrentHouse>>(routes.currentHouses()).pipe(map((page) => page.items));
  }

  getCurrentUserHousesCount(): Observable<number> {
    return this.httpClient.get<Value<number>>(routes.currentHousesCount()).pipe(map((value) => value.value));
  }

  createHouse(input: HouseCreate): Observable<House> {
    return this.httpClient.post<House>(routes.houses(), input);
  }

  getHouseById(id: string): Observable<House> {
    return this.httpClient.get<House>(routes.houseById(id));
  }

  deleteHouse(id: string): Observable<void> {
    return this.httpClient.delete<void>(routes.houseById(id));
  }
}
