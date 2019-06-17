import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

import { Character } from '../../shared/model/shared.interface'

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
    @Input('grid-style') style: 'grid' | 'grid-spaced' = 'grid'
    @Input('isFetching') loading: boolean
    @Input('hasMore') hasMore: boolean

    @Output('onScroll') scrollEvent = new EventEmitter<void>()

    constructor() {}

    ngOnInit() {}

    onScroll() {
        this.scrollEvent.emit()
    }
}
