import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Subscription, Observable } from 'rxjs'
import { Store, select } from '@ngrx/store'

import { Filter } from 'src/app/list-view/list-view.interface'
import { FILTER_TYPE } from 'src/app/list-view/list-view.metadata'
import { AppState } from '../../store/app.reducer'
import * as fromRoot from '../../store/app.selector'

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
    routeSub: Subscription
    filter: Filter
    charactersCount: Observable<number>
    comicsCount: Observable<number>
    seriesCount: Observable<number>

    constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

    ngOnInit() {
        this.routeSub = this.route.queryParams.subscribe((params: Params) => {
            const key = 'search'
            this.filter = {
                type: FILTER_TYPE.title,
                value: params[key],
            }
        })
    }

    subscribeToStore() {
        this.charactersCount = this.store.pipe(select(fromRoot.selectCharactersByNameTotal))
        this.comicsCount = this.store.pipe(select(fromRoot.selectComicsByNameTotal))
        this.seriesCount = this.store.pipe(select(fromRoot.selectSeriesByNameTotal))
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe()
    }
}
