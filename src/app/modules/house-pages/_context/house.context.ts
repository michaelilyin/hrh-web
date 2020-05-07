import { House } from '@hrh/houses/_models/house.model';
import { Injectable, Injector } from '@angular/core';
import { ContextService } from '@hrh/sdk/context/context.service';
import { Observable } from 'rxjs';
import { ID } from '@hrh/sdk/api/id.model';
import { HousesService } from '@hrh/houses/_services/houses.service';

@Injectable()
export class HouseContextService extends ContextService<House> {
  protected readonly idKey = 'houseId';

  constructor(private readonly housesService: HousesService, injector: Injector) {
    super(injector);
  }

  protected loadById(id: ID): Observable<House> {
    return this.housesService.getHouseById(id);
  }
}
