import { Component, OnInit } from '@angular/core'
import { COMPONENT_TYPE } from '../../list/list-details/list-details.metadata'

@Component({
    selector: 'app-character-details',
    template: `
        <app-list-details [isBgImage]="true" [type]="componentType"></app-list-details>
    `,
})
export class CharacterDetailsComponent implements OnInit {
    componentType = COMPONENT_TYPE.character

    constructor() {}

    ngOnInit() {}
}
