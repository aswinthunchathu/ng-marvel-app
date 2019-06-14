import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { map, tap } from 'rxjs/operators'

import { Character, Image } from '../shared/model/shared.interface'
import { AppState } from '../store/app.reducer'
import * as fromCharactersAction from './store/characters.actions'
import { ImageGenerator, types } from '../shared/model/image-generator.model'

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
                this.loading = res.fetching
                if (this.hasMore !== res.pagination.hasMore) {
                    this.hasMore = res.pagination.hasMore
                }
            }),
            map(res => res.data)
        )
    }

    getImage = (image: Image, placeholder: boolean = false) =>
        new ImageGenerator(image.path, image.extension, placeholder ? types.standard_small : types.standard_fantastic)
            .image

    onScroll() {
        this.store.dispatch(new fromCharactersAction.FetchCharactersNextPage())
    }
}
