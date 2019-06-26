import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs'

import { APIResponse } from '../model/shared.interface'

export class ApiInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedRequest = req.clone({
            url: `https://gateway.marvel.com/v1/public/${req.url}`,
            params: req.params.append('apikey', '1fa11c1e05a4b35c680736954ab33b15'),
        })
        return next.handle(modifiedRequest)
    }
}

@Injectable({
    providedIn: 'root',
})
export class APIService {
    constructor(private http$: HttpClient) {}

    public fetchFromServer<T>(url: string, limit?: number, offset?: number) {
        const options = {}
        const params = 'params'
        if (limit && offset) {
            options[params] = new HttpParams().set('limit', String(limit)).set('offset', String(offset))
        }
        return this.http$.get<APIResponse<T>>(url, options)
    }
}
