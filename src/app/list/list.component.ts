import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { AppState } from '../store/app.reducer'
import { CharacterModel } from '../characters/character.model'
import { ImageType } from '../shared/model/image-generator.model'
import { Pagination } from '../shared/model/pagination.model'
import { mapping, Filter, COMPONENT_TYPE, FILTER_TYPE } from './list.metadata'
import { State as UIState } from '../store/ui/ui.reducer'
import { ComicModel } from '../comics/comic.model'
import { SeriesModel } from '../series/series.model'
import { Required } from '../shared/decorators/inputRequired.decorator'

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnChanges {
    @Input() @Required type: COMPONENT_TYPE
    @Input() filter: Filter
    @Input() infinityScroll = false
    @Input() spacedItems = true
    @Input() withPagination = false
    @Input() imageType = ImageType.portrait
    @Input() isAnimated = false
    @Input() isFloatingLabel = false

    //component props
    ui: UIState
    pagination: Pagination
    list: Observable<CharacterModel[] | ComicModel[] | SeriesModel[]>
    showPagination: boolean

    constructor(private store: Store<AppState>) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.filter && !changes.filter.firstChange) {
            if (changes.filter.previousValue !== changes.filter.currentValue) {
                this.filter = changes.filter.currentValue
                this.queryOnStore()
            }
        }
    }

    ngOnInit() {
        this.subscribeToStore()
        this.queryOnStore()
    }

    queryOnStore() {
        let settings
        if (!!this.filter) {
            settings = mapping[this.type][this.filter.type]
            this.store.dispatch(
                settings.action.fetchStart({
                    payload: this.filter.value,
                })
            )
        } else {
            settings = mapping[this.type][FILTER_TYPE.none]
            this.store.dispatch(settings.action.fetchStart())
        }
    }

    subscribeToStore() {
        const settings = mapping[this.type][this.filter ? this.filter.type : FILTER_TYPE.none]
        this.store
            .select(settings.state)
            .pipe(tap(res => this.setShowPagination(res.pagination.data)))
            .subscribe(res => {
                this.ui = res.ui
                this.pagination = res.pagination
            })
        this.list = this.store.pipe(select(settings.list))
    }

    setShowPagination(data: Pagination) {
        if (this.withPagination) {
            this.showPagination = data.total > 0
        }
    }

    onScroll() {
        this.store.dispatch(
            mapping[this.type][this.filter ? this.filter.type : FILTER_TYPE.none].action.fetchNextPage()
        )
    }
}
