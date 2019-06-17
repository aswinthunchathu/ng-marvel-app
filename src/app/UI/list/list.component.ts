import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

export enum Style {
    grid = 'grid',
    gridSpaced = 'grid-spaced',
}

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
    @Input('isInfiniteScroll') isInfiniteScroll: boolean = false
    @Input('grid-style') gridStyle = 'grid'
    @Input('isFetching') loading: boolean
    @Input('hasMore') hasMore: boolean

    @Output('onScroll') scrollEvent = new EventEmitter<void>()

    constructor() {}

    ngOnInit() {}

    onScroll() {
        this.scrollEvent.emit()
    }
}
