import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { tap, map } from 'rxjs/operators'

import { AppState } from '../store/app.reducer'
import { Series, Image } from '../shared/model/shared.interface'
import { ImageGenerator, types } from '../shared/model/image-generator.model'
import * as fromSeriesActions from './store/series.actions'

@Component({
    selector: 'app-series',
    templateUrl: './series.component.html',
    styleUrls: ['./series.component.scss'],
})
export class SeriesComponent implements OnInit {
    seriesList: Observable<Series[]>
    hasMore: boolean = true
    loading: boolean = true

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.store.dispatch(new fromSeriesActions.FetchSeriesInit())
        this.seriesList = this.store.select('series').pipe(
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
        this.store.dispatch(new fromSeriesActions.FetchSeriesNextPage())
    }
}
