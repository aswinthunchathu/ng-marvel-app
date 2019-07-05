import { Component, OnInit } from '@angular/core'
import { COMPONENT_TYPE } from '../../list/list-details/list-details.metadata'

@Component({
    selector: 'app-series-details',
    template: `
        <app-list-details [type]="componentType"></app-list-details>
    `,
})
export class SeriesDetailsComponent implements OnInit {
    componentType = COMPONENT_TYPE.comic

    constructor() {}

    ngOnInit() {}
}
