import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { map, tap } from 'rxjs/operators'

import { AppState } from '../store/app.reducer'
import * as fromCharactersAction from './store/characters.actions'
import { CharacterModel } from './character.model'

@Component({
    selector: 'app-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
    characters: Observable<CharacterModel[]>
    hasMore: boolean = true
    loading: boolean = true

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.store.dispatch(new fromCharactersAction.FetchCharactersInit())
        this.characters = this.store.select('characters').pipe(
            tap(res => {
                this.loading = res.fetching
                if (this.hasMore !== res.pagination.hasMore) {
                    this.hasMore = res.pagination.hasMore
                }
            }),
            map(res => res.data)
        )
    }

    onScroll() {
        this.store.dispatch(new fromCharactersAction.FetchCharactersNextPage())
    }
}
