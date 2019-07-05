import { Component, OnInit } from '@angular/core'
import { COMPONENT_TYPE } from '../list/list.metadata'

@Component({
    selector: 'app-comics',
    templateUrl: './comics.component.html',
    styleUrls: ['./comics.component.scss'],
})
export class ComicsComponent implements OnInit {
    type = COMPONENT_TYPE.comics

    constructor() {}

    ngOnInit() {}
}
