import { ActivatedRouteSnapshot, Data, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HousesService } from '@hrh/houses/_services/houses.service';
import { NotificationsService } from '@hrh/sdk/notifications/_services/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentHousesCountResolver implements Resolve<number> {
  static field = 'currentHousesCount';
  static extract(data: Data): number {
    return data[CurrentHousesCountResolver.field] as number;
  }

  constructor(
    private readonly housesService: HousesService,
    private readonly notificationsService: NotificationsService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number> | Promise<number> | number {
    return this.housesService.getCurrentUserHousesCount().pipe(this.notificationsService.catchError(() => EMPTY));
  }
}
