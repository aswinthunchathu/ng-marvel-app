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
    // tslint:disable-next-line:no-input-rename
    @Input('isInfiniteScroll') isInfiniteScroll = false
    // tslint:disable-next-line:no-input-rename
    @Input('grid-style') gridStyle = 'grid'
    // tslint:disable-next-line:no-input-rename
    @Input('isFetching') loading: boolean
    // tslint:disable-next-line:no-input-rename
    @Input('hasMore') hasMore: boolean

    @Output() scrollEvent = new EventEmitter<void>()

    constructor() {}

    ngOnInit() {}

    onScrolling() {
        this.scrollEvent.emit()
    }
}
