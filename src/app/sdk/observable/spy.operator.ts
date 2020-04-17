import { MonoTypeOperatorFunction, Observable, Operator, Subscriber, TeardownLogic } from 'rxjs';

export function spy<T>(message: string): MonoTypeOperatorFunction<T> {
  return function spyOperatorFunction(source: Observable<T>): Observable<T> {
    return source.lift(new DoOperator(message));
  };
}

class DoOperator<T> implements Operator<T, T> {
  constructor(private message: string) {}

  // tslint:disable-next-line:no-any
  call(subscriber: Subscriber<T>, source: any): TeardownLogic {
    // tslint:disable-next-line:no-unsafe-any
    return source.subscribe(new SpySubscriber(subscriber, this.message));
  }
}

class SpySubscriber<T> extends Subscriber<T> {
  constructor(destination: Subscriber<T>, private message: string) {
    super(destination);
  }

  _next(value: T) {
    try {
      // tslint:disable-next-line:no-console
      console.info(`[SPY(NEXT)]: ${this.message}`, value);
    } catch (err) {
      this.destination.error?.(err);
      return;
    }
    this.destination.next?.(value);
  }

  // tslint:disable-next-line:no-any
  _error(err: any) {
    try {
      // tslint:disable-next-line:no-console
      console.info(`[SPY(ERROR)]: ${this.message}`, err);
    } catch (err) {
      this.destination.error?.(err);
      return;
    }
    this.destination.error?.(err);
  }

  _complete() {
    try {
      // tslint:disable-next-line:no-console
      console.info(`[SPY(COMPLETE)]: ${this.message}`);
    } catch (err) {
      this.destination.error?.(err);
      return;
    }
    return this.destination.complete?.();
  }
}
