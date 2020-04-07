import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TestHttpService} from './core/services/test-http.service';

@Component({
  selector: 'hrh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'hrh';

  private test$ = this.testHttpService.getTest();
  private test1$ = this.testHttpService.getTest1();

  constructor(public readonly testHttpService: TestHttpService) {
  }
}
