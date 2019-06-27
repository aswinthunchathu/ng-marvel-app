import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { APIResponse, Character, Series } from '../model/shared.interface'
import { Comic } from 'src/app/shared/model/shared.interface'

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

    fetchFromServer<T>(url: string, limit?: number, offset?: number) {
        const options = {}
        const params = 'params'
        if (limit && offset) {
            options[params] = new HttpParams().set('limit', String(limit)).set('offset', String(offset))
        }
        return this.http$.get<APIResponse<T>>(url, options)
    }

    getCharacters = (limit?: number, offset?: number) =>
        this.fetchFromServer<Character>('characters', limit, offset).pipe(map(res => res.data))

    getCharacter = (id: number) =>
        this.fetchFromServer<Character>(`characters/${id}`).pipe(
            map(res => (res.data && res.data.results && res.data.results.length > 0 ? res.data.results[0] : null))
        )

    getCharactersBySeriesId = (id: number, limit?: number, offset?: number) =>
        this.fetchFromServer<Character>(`series/${id}/characters`, limit, offset).pipe(map(res => res.data))

    getCharactersByComicId = (id: number, limit?: number, offset?: number) =>
        this.fetchFromServer<Character>(`comics/${id}/characters`, limit, offset).pipe(map(res => res.data))

    getComics = (limit?: number, offset?: number) =>
        this.fetchFromServer<Comic>('comics', limit, offset).pipe(map(res => res.data))

    getComic = (id: number) =>
        this.fetchFromServer<Comic>(`comics/${id}`).pipe(
            map(res => (res.data && res.data.results && res.data.results.length > 0 ? res.data.results[0] : null))
        )

    getComicsBySeriesId = (id: number, limit?: number, offset?: number) =>
        this.fetchFromServer<Comic>(`series/${id}/comics`, limit, offset).pipe(map(res => res.data))

    getComicsByCharactersId = (id: number, limit?: number, offset?: number) =>
        this.fetchFromServer<Comic>(`characters/${id}/comics`, limit, offset).pipe(map(res => res.data))

    getSeries = (limit?: number, offset?: number) =>
        this.fetchFromServer<Series>('series', limit, offset).pipe(map(res => res.data))

    getSeriesById = (id: number) =>
        this.fetchFromServer<Series>(`series/${id}`).pipe(
            map(res => (res.data && res.data.results && res.data.results.length > 0 ? res.data.results[0] : null))
        )

    getSeriesByCharactersId = (id: number, limit?: number, offset?: number) =>
        this.fetchFromServer<Series>(`characters/${id}/series`, limit, offset).pipe(map(res => res.data))
}
