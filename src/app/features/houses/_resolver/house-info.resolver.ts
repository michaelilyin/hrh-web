import { ActivatedRouteSnapshot, Data, Resolve, RouterStateSnapshot } from '@angular/router';
import { House } from '@hrh/houses/_models/house.model';
import { Injectable } from '@angular/core';
import { HousesService } from '@hrh/houses/_services/houses.service';
import { EMPTY, Observable } from 'rxjs';
import { NotificationsService } from '@hrh/sdk/notifications/_services/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class HouseInfoResolver implements Resolve<House> {
  static field = 'houseInfo';
  static extract(data: Data): House {
    return data[HouseInfoResolver.field] as House;
  }

  constructor(
    private readonly housesService: HousesService,
    private readonly notificationsService: NotificationsService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<House> | Promise<House> | House {
    const id = route.paramMap.get('houseId');
    if (id == undefined) {
      throw Error('ID must be present');
    }

    return this.housesService.getHouseById(id).pipe(this.notificationsService.catchError(() => EMPTY));
  }
}
