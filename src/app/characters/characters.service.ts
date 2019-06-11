import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { tap, map } from 'rxjs/operators'

import { Pagination } from '../shared/pagination.model'
import { Character } from '../shared/shared.interface'

export interface Results {
    data: {
        offset: number
        limit: number
        total: number
        count: number
        results: Character[]
    }
}

@Injectable({
    providedIn: 'root',
})
export class CharactersService {
    _characters: Character[] = []
    _pagination: Pagination = null

    constructor(private http: HttpClient) {}

    get characters() {
        return this._characters
    }

    public fetchCharactersFromServer = () =>
        this.http
            .get<Results>('https://gateway.marvel.com/v1/public/characters?apikey=1fa11c1e05a4b35c680736954ab33b15')
            .pipe(
                map(res => res.data),
                tap(res => {
                    this._characters = res.results
                    this._pagination = new Pagination(res.offset, res.limit, res.total, res.count)
                })
            )
}
