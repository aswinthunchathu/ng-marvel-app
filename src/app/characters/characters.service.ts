import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs'
import { tap, map } from 'rxjs/operators'

import { Character } from '../shared/character.model'
import { Pagination } from '../shared/pagination.model'

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
    characters: Character[] = []
    pagination: Pagination = null

    constructor(private http: HttpClient) {}

    public fetchCharacters = () => [...this.characters]

    public fetchCharactersFromServer = () =>
        this.http
            .get<Results>('https://gateway.marvel.com/v1/public/characters?apikey=1fa11c1e05a4b35c680736954ab33b15')
            .pipe(
                map(res => res.data),
                tap(res => {
                    this.characters = res.results
                    this.pagination = new Pagination(res.offset, res.limit, res.total, res.count)
                })
            )
}
