import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { tap, map } from 'rxjs/operators'

import { Comic, Image } from '../shared/model/shared.interface'
import { AppState } from '../store/app.reducer'
import * as fromComicsAction from './store/comics.actions'
import { ImageGenerator, types } from '../shared/model/image-generator.model'

@Component({
    selector: 'app-comics',
    templateUrl: './comics.component.html',
    styleUrls: ['./comics.component.scss'],
})
export class ComicsComponent implements OnInit {
    comics: Observable<Comic[]>
    hasMore: boolean = true
    loading: boolean = true

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.store.dispatch(new fromComicsAction.FetchComicsInit())
        this.comics = this.store.select('comics').pipe(
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
        new ImageGenerator(image.path, image.extension, placeholder ? types.portrait_small : types.portrait_incredible)
            .image

    onScroll() {
        this.store.dispatch(new fromComicsAction.FetchComicsNextPage())
    }
}
