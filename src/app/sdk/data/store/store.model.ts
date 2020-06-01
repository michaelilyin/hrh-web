import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { DataRequest } from '@hrh/sdk/data/model/data-request.model';

export abstract class Store {
  abstract readonly saveRequest$: Subject<DataRequest>;

  abstract readonly initialized$: Observable<DataRequest | undefined>;
  abstract readonly savedRequest$: Observable<DataRequest | undefined>;
}

export class InMemoryStore extends Store {
  readonly saveRequest$ = new ReplaySubject<DataRequest>(1);

  readonly initialized$ = new BehaviorSubject<DataRequest | undefined>(undefined);
  readonly savedRequest$ = new ReplaySubject<DataRequest | undefined>(1);

  constructor() {
    super();
    this.saveRequest$.subscribe(this.savedRequest$);
  }
}
