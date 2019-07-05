import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { COMPONENT_TYPE, FILTER_TYPE, Filter } from '../list/list.metadata'

@Component({
    selector: 'app-series',
    template: `
        <app-list [filter]="filter" [type]="type" [infinityScroll]="true" [withPagination]="true"></app-list>
    `,
})
export class SeriesComponent implements OnInit {
    type = COMPONENT_TYPE.series
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
