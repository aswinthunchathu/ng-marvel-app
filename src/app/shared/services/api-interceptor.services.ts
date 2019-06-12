import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

export class ApiInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedRequest = req.clone({
            url: `https://gateway.marvel.com/v1/public/${req.url}`,
            params: req.params.append('apikey', '1fa11c1e05a4b35c680736954ab33b15'),
            //headers: req.headers.append('Accept-Encoding', 'gzip'),
        })
        return next.handle(modifiedRequest)
    }
}
