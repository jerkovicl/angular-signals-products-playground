import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject, Injectable, Injector } from '@angular/core';
import { NotificationService } from './notifications.service';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  private readonly injector: Injector = inject(Injector);

  handleError(error: Error | HttpErrorResponse) {
    const notifier: NotificationService =
      this.injector.get(NotificationService);
    const message: string = error.message ? error.message : error.toString();
    if (error instanceof HttpErrorResponse) {
      // server error
      notifier.openServerErrorDialog(error.message);
    } else {
      // client error
      notifier.showClientError(message);
    }
    // log every error to the console
    console.error(message);
  }
}
