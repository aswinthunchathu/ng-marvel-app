import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { ActivatedRoute, Params } from '@angular/router'

import { AppState } from '../../store/app.reducer'
import * as fromComicActions from './store/comic.actions'
import { ListDetailsModel } from '../../shared/components/list/list-details/list-details.model'
import { FILTER_TYPE } from '../../constants'
import { Filter } from '../../shared/model/shared.interface'

@Component({
    selector: 'app-comic-details',
    templateUrl: './comic-details.component.html',
    styleUrls: ['./comic-details.component.scss'],
})
export class ComicDetailsComponent implements OnInit, OnDestroy {
    private routeSub: Subscription
    private comicSub: Subscription
    loading: boolean
    comic: ListDetailsModel
    filter: Filter = null
    hasError: boolean

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

    ngOnInit() {
        this.queryOnStore()
        this.subscribeToStore()
    }

    queryOnStore() {
        this.routeSub = this.route.params.subscribe((params: Params) => {
            const id = +params['id']
            this.filter = {
                type: FILTER_TYPE.comics,
                id,
            }
            this.store.dispatch(
                fromComicActions.fetchStart({
                    payload: id,
                })
            )
        })
    }

    subscribeToStore() {
        this.comicSub = this.store.select('comic').subscribe(({ ui, data: state }) => {
            this.loading = ui.fetching
            if (state.data) {
                this.comic = new ListDetailsModel(
                    state.data.title,
                    state.data.image.portrait.actual,
                    state.data.image.portrait.placeholder,
                    state.data.description
                )
            }

            if (ui.error) {
                this.hasError = true
            }
        })
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe()
        this.comicSub.unsubscribe()
    }
}
