import { Component, OnInit } from '@angular/core'
import { Filter as FILTER_CHARACTERS } from '../characters/characters.component'
import { FILTER_TYPE as FILTER_TYPE_CHARACTERS } from '../characters/characters.metadata'

@Component({
    selector: 'app-dummy',
    templateUrl: './dummy.component.html',
    styleUrls: ['./dummy.component.scss'],
})
export class DummyComponent implements OnInit {
    filter: FILTER_CHARACTERS = {
        type: FILTER_TYPE_CHARACTERS.byTitle,
        value: 'spi',
    }

    constructor() {}

    ngOnInit() {}
}
