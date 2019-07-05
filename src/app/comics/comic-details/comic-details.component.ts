import { Component, OnInit } from '@angular/core'
import { COMPONENT_TYPE } from '../../list/list-details/list-details.metadata'

@Component({
    selector: 'app-comic-details',
    template: `
        <app-list-details [type]="componentType"></app-list-details>
    `,
})
export class ComicDetailsComponent implements OnInit {
    componentType = COMPONENT_TYPE.comic

    constructor() {}

    ngOnInit() {}
}
