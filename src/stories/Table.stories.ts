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
  const response: DataResponse<Entity> = {
    items: ENTITIES.slice(request.page.offset, request.page.offset + request.page.limit),
    total: ENTITIES.length
  };
  return of(response).pipe(delay(1000));
};

storiesOf('Table and DataSource', module)
  .addDecorator(
    moduleMetadata({
      imports: [MatTableModule, BrowserAnimationsModule, DataModule, SdkModule]
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
  .add('Simple table with pagination', () => ({
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
  }));
