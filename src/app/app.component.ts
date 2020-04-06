import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TestHttpService} from "./core/services/test-http.service";

@Component({
  selector: 'hrh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'hrh';

  constructor(public readonly testHttpService: TestHttpService) {
  }
}
