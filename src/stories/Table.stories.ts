import { moduleMetadata, storiesOf } from '@storybook/angular';
import { MatTableModule } from '@angular/material/table';
import * as faker from 'faker';
import { DataModule } from '@hrh/sdk/data/data.module';
import { DataResponse, FetchFn } from '@hrh/sdk/data/model/data-request.model';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SdkModule } from '@hrh/sdk/sdk.module';
import { action } from '@storybook/addon-actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';

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
  const field = request.sort.fields[0]?.name as keyof Entity | undefined;
  const desc = request.sort.fields[0]?.direction === 'desc';
  let entities = ENTITIES.slice();
  if (field != undefined) {
    entities = entities.sort((e1, e2) => {
      if (desc) {
        return e1[field] < e2[field] ? 1 : -1;
      }
      return e1[field] > e2[field] ? 1 : -1;
    });
  }
  const response: DataResponse<Entity> = {
    items: entities.slice(request.page.offset, request.page.offset + request.page.limit),
    total: entities.length
  };
  return of(response).pipe(delay(1000));
};

storiesOf('Table and DataSource', module)
  .addDecorator(
    moduleMetadata({
      imports: [MatTableModule, MatSortModule, BrowserAnimationsModule, DataModule, SdkModule]
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
  }));
