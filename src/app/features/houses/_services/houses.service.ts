import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentHouse, House, HouseBasicUpdate, HouseCreate } from '../_models/house.model';
import { filter, map, mapTo } from 'rxjs/operators';
import { Value } from '@hrh/sdk/api/value.model';
import { spy } from '@hrh/sdk/observable/spy.operator';
import { HttpStreamService } from '@hrh/sdk/angular/http/http-stream.service';

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
  constructor(private httpClient: HttpClient, private readonly stream: HttpStreamService) {}

  streamCurrentUserHouses(): Observable<readonly CurrentHouse[]> {
    return this.stream.get<CurrentHouse>(houseRoutes.currentHouses(), true);
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
