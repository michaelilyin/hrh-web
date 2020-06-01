import { WrappedResponse } from '@hrh/sdk/data/model/data-request.model';

export interface DataSourcePostProcessor<T> {
  postProcess(response: WrappedResponse<T>): WrappedResponse<T>;
}
