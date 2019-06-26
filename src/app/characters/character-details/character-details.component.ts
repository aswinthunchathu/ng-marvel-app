import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { ActivatedRoute, Params } from '@angular/router'

import { AppState } from '../../store/app.reducer'
import * as fromCharacterActions from './store/character.actions'
import { BgService } from '../../shared/services/bg.service'
import { ListDetailsModel } from '../../shared/components/list/list-details/list-details.model'
import { FILTER_TYPE } from '../../constants'
import { Filter } from 'src/app/shared/model/shared.interface'

@Component({
    selector: 'app-character-details',
    templateUrl: './character-details.component.html',
    styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {
    private routeSub: Subscription
    private characterSub: Subscription
    loading: boolean
    character: ListDetailsModel
    bgImage = ''
    filter: Filter = null
    hasError: boolean

    constructor(private store: Store<AppState>, private route: ActivatedRoute, private bgService: BgService) {}

    ngOnInit() {
        this.queryOnStore()
        this.subscribeToStore()
    }

    queryOnStore() {
        this.routeSub = this.route.params.subscribe((params: Params) => {
            const key = 'id'
            const id = +params[key]
            this.filter = {
                type: FILTER_TYPE.character,
                id,
            }
            this.store.dispatch(
                fromCharacterActions.fetchStart({
                    payload: id,
                })
            )
        })
    }

    subscribeToStore() {
        this.characterSub = this.store.select('character').subscribe(({ ui, data: state }) => {
            this.loading = ui.fetching
            if (state.data) {
                this.character = new ListDetailsModel(
                    state.data.title,
                    state.data.image.portrait.actual,
                    state.data.image.portrait.placeholder,
                    state.data.description
                )
                this.bgService.setBgImage(state.data.image.default.actual)
            }

            if (ui.error) {
                this.hasError = true
            }
        })
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe()
        this.characterSub.unsubscribe()
        this.bgService.setBgImage('')
    }
}
