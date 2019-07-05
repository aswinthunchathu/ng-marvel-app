import { Component, OnInit } from '@angular/core'

import { COMPONENT_TYPE } from '../list/list.metadata'

@Component({
    selector: 'app-series',
    templateUrl: './series.component.html',
    styleUrls: ['./series.component.scss'],
})
export class SeriesComponent implements OnInit {
    type = COMPONENT_TYPE.series

    constructor() {}

    ngOnInit() {}
}
