import { moduleMetadata, storiesOf } from '@storybook/angular';
import { MatTableModule } from '@angular/material/table';
import * as faker from 'faker';
import { DataModule } from '@hrh/sdk/data/data.module';
import { DataResponse, FetchFn } from '@hrh/sdk/data/model/data-request.model';
import { BehaviorSubject, of, Subject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SdkModule } from '@hrh/sdk/sdk.module';
import { action } from '@storybook/addon-actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@hrh/sdk/forms/forms.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TableModule } from '@hrh/sdk/table/table.module';
import { ActivatedRoute, ParamMap, Router, RouterModule, NavigationExtras } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

interface Entity {
  firstName: string;
  lastName: string;
}

const COLUMNS = ['firstName', 'lastName'];

faker.seed(21);
const ENTITIES = Array.from(Array(1000)).map(() => {
  const entity: Entity = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  };
  return entity;
});

const FETCH_FN: FetchFn<Entity> = (request) => {
  action('fetch request')(request);
  let entities = ENTITIES.slice();
  const firstNameField = request.filter.fields.firstName;
  if (firstNameField?.value != undefined) {
    entities = entities.filter((e) =>
      e.firstName.toLowerCase().includes((firstNameField.value as string).trim().toLowerCase())
    );
  }

  const lastNameField = request.filter.fields.lastName;
  if (lastNameField?.value != undefined) {
    entities = entities.filter((e) =>
      e.lastName.toLowerCase().includes((lastNameField.value as string).trim().toLowerCase())
    );
  }

  const sort = request.sort.fields[0]?.name as keyof Entity | undefined;
  const desc = request.sort.fields[0]?.direction === 'desc';
  if (sort != undefined) {
    entities = entities.sort((e1, e2) => {
      if (desc) {
        return e1[sort] < e2[sort] ? 1 : -1;
      }
      return e1[sort] > e2[sort] ? 1 : -1;
    });
  }
  const response: DataResponse<Entity> = {
    items: entities.slice(request.page.offset, request.page.offset + request.page.limit),
    total: entities.length
  };
  return of(response).pipe(delay(1000));
};

class PMap implements ParamMap {
  private map = new Map<string, string[]>();

  get(name: string): string | null {
    return this.getAll(name)[0];
  }

  getAll(name: string): string[] {
    return this.map.get(name) ?? [];
  }

  has(name: string): boolean {
    return this.map.has(name);
  }

  get keys(): string[] {
    return Array.from(this.map.keys());
  }

  set(name: string, params: string[]) {
    this.map.set(name, params);
  }
}

const queryParamMap = new BehaviorSubject<PMap>(new PMap());

const route: Partial<ActivatedRoute> = {
  get queryParamMap(): Observable<ParamMap> {
    return queryParamMap;
  }
};

const router: Partial<Router> = {
  navigate(commands: unknown[], extras?: NavigationExtras): Promise<boolean> {
    const map = new PMap();
    Object.entries(extras?.queryParams ?? {}).forEach(([key, value]) => {
      if (value == undefined) {
        return;
      }
      const params = Array.isArray(value) ? value : [value];
      map.set(
        key,
        params.map((p) => p.toString())
      );
    });
    action('navigate with params')(extras?.queryParams);
    return Promise.resolve().then(() => {
      queryParamMap.next(map);
      return Promise.resolve(true);
    });
  }
};

export function routerFactory() {
  return router;
}

export function routeFactory() {
  return route;
}

storiesOf('Table and DataSource', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        MatTableModule,
        MatSortModule,
        FormsModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        DataModule,
        SdkModule,
        MatIconModule,
        MatButtonModule,
        TableModule
      ],
      providers: [
        {
          provide: Router,
          useFactory: routerFactory
        },
        {
          provide: ActivatedRoute,
          useFactory: routeFactory
        }
      ]
    })
  )
  .add('Simple table with primitive DataSource', () => ({
    template: `
<hrh-loader #loader></hrh-loader>
<table mat-table [hrhMatTableDs]="fetch" [loader]="loader" style="width: 100%;">
  <ng-container matColumnDef="firstName">
    <th *matHeaderCellDef mat-header-cell>First Name</th>
    <td *matCellDef="let row" mat-cell>{{row.firstName}}</td>
  </ng-container>

  <ng-container matColumnDef="lastName">
    <th *matHeaderCellDef mat-header-cell>Last Name</th>
    <td *matCellDef="let row" mat-cell>{{row.lastName}}</td>
  </ng-container>

  <tr *matHeaderRowDef="columns; sticky: true" mat-header-row></tr>
  <tr *matRowDef="let row; columns: columns" mat-row></tr>
</table>
    `,
    props: {
      columns: COLUMNS,
      fetch: FETCH_FN
    }
  }))
  .add('Table with pagination', () => ({
    template: `
<hrh-loader #loader></hrh-loader>
<table mat-table #ds="ds" [hrhMatTableDs]="fetch" [loader]="loader" style="width: 100%;">
  <ng-container matColumnDef="firstName">
    <th *matHeaderCellDef mat-header-cell>First Name</th>
    <td *matCellDef="let row" mat-cell>{{row.firstName}}</td>
  </ng-container>

  <ng-container matColumnDef="lastName">
    <th *matHeaderCellDef mat-header-cell>Last Name</th>
    <td *matCellDef="let row" mat-cell>{{row.lastName}}</td>
  </ng-container>

  <tr *matHeaderRowDef="columns; sticky: true" mat-header-row></tr>
  <tr *matRowDef="let row; columns: columns" mat-row></tr>
</table>
<hrh-ds-mat-paginator [paginatorFor]="ds">
</hrh-ds-mat-paginator>
    `,
    props: {
      columns: COLUMNS,
      fetch: FETCH_FN
    }
  }))
  .add('Table with sort and pagination', () => ({
    template: `
<hrh-loader #loader></hrh-loader>
<table mat-table
       #ds="ds"
       [hrhMatTableDs]="fetch"
       [loader]="loader"
       matSort
       matSortActive="firstName"
       matSortDirection="asc"
       style="width: 100%;"
>
  <ng-container matColumnDef="firstName">
    <th *matHeaderCellDef mat-header-cell mat-sort-header="firstName">First Name</th>
    <td *matCellDef="let row" mat-cell>{{row.firstName}}</td>
  </ng-container>

  <ng-container matColumnDef="lastName">
    <th *matHeaderCellDef mat-header-cell mat-sort-header="lastName">Last Name</th>
    <td *matCellDef="let row" mat-cell>{{row.lastName}}</td>
  </ng-container>

  <tr *matHeaderRowDef="columns; sticky: true" mat-header-row></tr>
  <tr *matRowDef="let row; columns: columns" mat-row></tr>
</table>
<hrh-ds-mat-paginator [paginatorFor]="ds">
</hrh-ds-mat-paginator>
    `,
    props: {
      columns: COLUMNS,
      fetch: FETCH_FN
    }
  }))
  .add('Table with pagination and filtration', () => ({
    template: `
<mat-toolbar>
  <hrh-text-field class="filter"
                  label="First Name"
                  ngModel
                  [hrhFilterFor]="ds"
                  name="firstName"
                  [type]="'text'">
    <hrh-clear hrhFieldSuffix></hrh-clear>
  </hrh-text-field>
  <hrh-text-field class="filter"
                  label="Last Name"
                  ngModel
                  [hrhFilterFor]="ds"
                  name="lastName"
                  [type]="'text'">
    <hrh-clear hrhFieldSuffix></hrh-clear>
  </hrh-text-field>
</mat-toolbar>
<hrh-loader #loader></hrh-loader>
<table mat-table
       #ds="ds"
       [hrhMatTableDs]="fetch"
       [loader]="loader"
       style="width: 100%;"
>
  <ng-container matColumnDef="firstName">
    <th *matHeaderCellDef mat-header-cell>First Name</th>
    <td *matCellDef="let row" mat-cell>{{row.firstName}}</td>
  </ng-container>

  <ng-container matColumnDef="lastName">
    <th *matHeaderCellDef mat-header-cell>Last Name</th>
    <td *matCellDef="let row" mat-cell>{{row.lastName}}</td>
  </ng-container>

  <tr *matHeaderRowDef="columns; sticky: true" mat-header-row></tr>
  <tr *matRowDef="let row; columns: columns" mat-row></tr>
</table>
<hrh-ds-mat-paginator [paginatorFor]="ds">
</hrh-ds-mat-paginator>
    `,
    styles: [
      `
.filter:not(:last-child) {
  margin-right: 16px;
}
    `
    ],
    props: {
      columns: COLUMNS,
      fetch: FETCH_FN
    }
  }))
  .add('Full featured table', () => ({
    template: `
<mat-toolbar>
  <hrh-text-field class="filter"
                  label="First Name"
                  ngModel
                  [hrhFilterFor]="ds"
                  name="firstName"
                  [type]="'text'">
    <hrh-clear hrhFieldSuffix></hrh-clear>
  </hrh-text-field>
  <hrh-text-field class="filter"
                  label="Last Name"
                  ngModel
                  [hrhFilterFor]="ds"
                  name="lastName"
                  [type]="'text'">
    <hrh-clear hrhFieldSuffix></hrh-clear>
  </hrh-text-field>
  <div style="flex: 1;"></div>
  <button mat-icon-button (click)="ds.refresh()">
    <mat-icon>refresh</mat-icon>
  </button>
</mat-toolbar>
<hrh-loader #loader></hrh-loader>
<hrh-table-container>
  <table mat-table
         #ds="ds"
         [hrhMatTableDs]="fetch"
         hrhDsRouterStore="fft"
         [loader]="loader"
         matSort
         matSortActive="firstName"
         matSortDirection="asc"
         style="width: 100%;"
  >
    <ng-container matColumnDef="firstName">
      <th *matHeaderCellDef mat-header-cell mat-sort-header="firstName">First Name</th>
      <td *matCellDef="let row" mat-cell>{{row.firstName}}</td>
    </ng-container>

    <ng-container matColumnDef="lastName">
      <th *matHeaderCellDef mat-header-cell mat-sort-header="lastName">Last Name</th>
      <td *matCellDef="let row" mat-cell>{{row.lastName}}</td>
    </ng-container>

    <tr *matHeaderRowDef="columns; sticky: true" mat-header-row></tr>
    <tr *matRowDef="let row; columns: columns" mat-row></tr>
  </table>
</hrh-table-container>
<hrh-ds-mat-paginator [paginatorFor]="ds">
</hrh-ds-mat-paginator>
    `,
    styles: [
      `
.filter:not(:last-child) {
  margin-right: 16px;
}
    `
    ],
    props: {
      columns: COLUMNS,
      fetch: FETCH_FN
    }
  }));
