import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

import { Required } from '../../decorators/inputRequired.decorator'

@Component({
    selector: 'app-list-view',
    templateUrl: './list-view.component.html',
    styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent implements OnInit {
    @Input() @Required hasError: boolean
    @Input() @Required loading: boolean
    @Input() spacedItems: boolean

    // infinite scroll settings
    @Input() @Required isInfiniteScroll: boolean
    @Input() hasMore: boolean
    @Output() scrolled: EventEmitter<void> = new EventEmitter()

    constructor() {}

    ngOnInit() {}

    onScroll() {
        this.scrolled.emit()
    }
}
