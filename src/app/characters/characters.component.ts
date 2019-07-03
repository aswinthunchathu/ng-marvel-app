import { Component, OnInit, Input } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { switchMap, map } from 'rxjs/operators'

import { mapping, FILTER_TYPE } from './characters.metadata'
import { AppState } from '../store/app.reducer'
import { State } from './store'
import { CharacterModel } from './character.model'
import { ImageType } from '../model/image-generator.model'

//filtered by title without infinite scroll

export interface Filter {
    type: FILTER_TYPE
    value: string | number
}

@Component({
    selector: 'app-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
    @Input() filter: Filter
    @Input() infinityScroll = true

    //component props
    settings = mapping()
    state: Observable<State>
    list: Observable<CharacterModel[]>

    //app-card props
    imageType = ImageType.portrait
    isAnimated = false
    isFloatingLabel = false

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.queryOnStore()
        this.subscribeToStore()
    }

    /*
        Dispatch NgRx actions
    */
    queryOnStore() {
        if (!!this.filter) {
            //filtered by comic id list with infinite scroll
            //filtered by series id list with infinite scroll
            //filtered by title with infinite scroll
        } else {
            //full list with infinite scroll
            this.imageType = ImageType.standard
            this.isAnimated = true
            this.isFloatingLabel = true
            this.store.dispatch(this.settings.action.fetchStart())
        }
    }

    /*
        Subscription to NgRx store
    */
    subscribeToStore() {
        this.state = this.store.select(this.settings.state)
        this.list = this.store.pipe(select(this.settings.list))

        // this.store
        //     .select(this.settings.state)
        //     .pipe(
        //         switchMap(res => {
        //             this.loading = res.ui.fetching
        //             // if (res.pagination) {
        //             //     this.pagination = res.pagination.data
        //             //     if (this.hasMore !== this.pagination.hasMore) {
        //             //         this.hasMore = this.pagination.hasMore
        //             //     }
        //             // }

        //             this.hasError = !!res.ui.error

        //             return this.store.pipe(select(this.service.list))
        //         })
        //     )
        //     .subscribe(res => {
        //         this.collection = res
        //         if (this.pagination && this.pagination.offset > -1) {
        //             this.showPagination = true
        //         }
        //     })
    }
}
