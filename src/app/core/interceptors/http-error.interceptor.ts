import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NotificationService } from "../services/notification.service";
import { catchError, never, Observable, throwError } from "rxjs";

@Injectable()
 export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';
        
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          switch (error.status) {
            case 401:
              errorMessage = 'Unauthorized: API key may be invalid';
              break;
            case 404:
              errorMessage = 'The requested resource was not found';
              break;
            case 429:
              errorMessage = 'Too many requests. Please try again later';
              break;
            case 500:
              errorMessage = 'Server error. Please try again later';
              break;
            default:
              errorMessage = `Error ${error.status}: ${error.message}`;
          }
        }
        
        this.notificationService.error(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}