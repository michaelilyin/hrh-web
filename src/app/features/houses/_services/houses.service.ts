import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Page } from '@hrh/sdk/api/page.model';
import { CurrentHouse, House, HouseCreate, HouseBasicUpdate } from '../_models/house.model';
import { map } from 'rxjs/operators';
import { Value } from '@hrh/sdk/api/value.model';

export const houseRoutes = {
  houses: () => '/v1/houses',
  currentHouses: () => `${houseRoutes.houses()}`,
  currentHousesCount: () => `${houseRoutes.currentHouses()}/count`,
  houseById: (id: string) => `${houseRoutes.houses()}/${id}`
};

@Injectable({
  providedIn: 'root'
})
export class HousesService {
  constructor(private httpClient: HttpClient) {}

  getCurrentUserHouses(): Observable<ReadonlyArray<CurrentHouse>> {
    return this.httpClient.get<Page<CurrentHouse>>(houseRoutes.currentHouses()).pipe(map((page) => page.items));
  }

  getCurrentUserHousesCount(): Observable<number> {
    return this.httpClient.get<Value<number>>(houseRoutes.currentHousesCount()).pipe(map((value) => value.value));
  }

  createHouse(input: HouseCreate): Observable<House> {
    return this.httpClient.post<House>(houseRoutes.houses(), input);
  }

  updateHouseBasicInfo(input: HouseBasicUpdate): Observable<House> {
    return this.httpClient.put<House>(houseRoutes.houseById(input.id), input);
  }

  getHouseById(id: string): Observable<House> {
    return this.httpClient.get<House>(houseRoutes.houseById(id));
  }

  deleteHouse(id: string): Observable<void> {
    return this.httpClient.delete<void>(houseRoutes.houseById(id));
  }
}
