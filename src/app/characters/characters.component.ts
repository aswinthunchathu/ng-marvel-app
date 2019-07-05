import { Component, OnInit } from '@angular/core'
import { COMPONENT_TYPE } from '../list/list.metadata'

@Component({
    selector: 'app-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
    type = COMPONENT_TYPE.characters
    constructor() {}

    ngOnInit() {}
}
