import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { COMPONENT_TYPE, FILTER_TYPE, Filter } from '../list/list.metadata'

@Component({
    selector: 'app-comics',
    template: `
        <app-list [filter]="filter" [type]="type" [infinityScroll]="true" [withPagination]="true"></app-list>
    `,
})
export class ComicsComponent implements OnInit {
    type = COMPONENT_TYPE.comics
    filter: Filter

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        const { key } = this.route.snapshot.queryParams
        if (key) {
            this.filter = {
                type: FILTER_TYPE.byTitle,
                value: key,
            }
        }
    }
}
