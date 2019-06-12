import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { map, tap } from 'rxjs/operators'

import { Character } from '../shared/model/shared.interface'
import { AppState } from '../store/app.reducer'
import * as fromCharactersAction from './store/characters.actions'

@Component({
    selector: 'app-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
    characters: Observable<Character[]>
    hasMore: boolean = true
    loading: boolean = true

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.store.dispatch(new fromCharactersAction.FetchCharactersInit())
        this.characters = this.store.select('characters').pipe(
            tap(res => {
                if (this.hasMore !== res.pagination.hasMore) {
                    this.hasMore = res.pagination.hasMore
                    this.loading = res.fetching
                }
            }),
            map(res => res.data)
        )
    }

    onScroll() {
        this.store.dispatch(new fromCharactersAction.FetchCharactersNextPage())
    }
}
