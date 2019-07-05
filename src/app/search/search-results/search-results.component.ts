import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { Store, select } from '@ngrx/store'

import { ActivatedRoute, Params } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Filter, COMPONENT_TYPE, FILTER_TYPE } from '../../list/list.metadata'
import { AppState } from '../../store/app.reducer'
import * as fromRoot from '../../store/app.selector'

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
    filter: Filter
    charactersType = COMPONENT_TYPE.characters
    comicsType = COMPONENT_TYPE.comics
    seriesType = COMPONENT_TYPE.series
    showCharactersLink: Observable<boolean>
    showComicsLink: Observable<boolean>
    showSeriesLink: Observable<boolean>

    constructor(private route: ActivatedRoute, private store: Store<AppState>, private cdRef: ChangeDetectorRef) {}

    ngOnInit() {
        this.route.queryParams.subscribe((data: Params) => {
            const { key } = data
            this.filter = {
                type: FILTER_TYPE.byTitle,
                value: key,
            }
        })
    }
    ngAfterViewChecked() {
        this.subscribeToStore()
        this.cdRef.detectChanges()
    }

    subscribeToStore() {
        this.showCharactersLink = this.store.select('charactersByName').pipe(map(res => res.pagination.data.hasMore))
        this.showComicsLink = this.store.select('comicsByName').pipe(map(res => res.pagination.data.hasMore))
        this.showSeriesLink = this.store.select('seriesByName').pipe(map(res => res.pagination.data.hasMore))
    }
}
