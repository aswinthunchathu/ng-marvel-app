import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { ActivatedRoute, Params } from '@angular/router'

import { AppState } from '../../store/app.reducer'
import * as fromCharacterActions from './store/character.actions'
import { BgService } from '../../shared/services/bg.service'
import { ListDetailsModel } from '../../UI/list/list-details/list-details.model'
import { FilterType as ComicsFilterType } from '../../comics/comics.component'
import { FilterType as SeriesFilterType } from '../../series/series.component'

@Component({
    selector: 'app-character-details',
    templateUrl: './character-details.component.html',
    styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {
    private routeSub: Subscription
    private characterSub: Subscription
    loading: boolean
    character: ListDetailsModel = null
    bgImage: string = ''
    filter: ComicsFilterType | SeriesFilterType = null

    constructor(private store: Store<AppState>, private route: ActivatedRoute, private bgService: BgService) {}

    ngOnInit() {
        this.queryOnStore()
        this.subscribeToStore()
    }

    queryOnStore() {
        this.routeSub = this.route.params.subscribe((params: Params) => {
            const id = +params['id']
            this.filter = {
                type: 'character',
                id,
            }
            this.store.dispatch(new fromCharacterActions.FetchCharacterStart(id))
        })
    }

    subscribeToStore() {
        this.characterSub = this.store.select('character').subscribe(res => {
            this.loading = res.fetching
            if (res.data) {
                this.character = new ListDetailsModel(
                    res.data.title,
                    res.data.image,
                    res.data.placeholder,
                    res.data.description
                )
                this.bgService.setBgImage(res.data.bgImage)
            }
        })
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe()
        this.characterSub.unsubscribe()
        this.bgService.setBgImage('')
    }
}
