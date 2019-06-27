import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { ListDetailsModel } from './list-details.model'

@Component({
    selector: 'app-list-details',
    templateUrl: './list-details.component.html',
    styleUrls: ['./list-details.component.scss'],
})
export class ListDetailsComponent implements OnInit, OnDestroy {
    @Input() item: ListDetailsModel
    @Input() withBgImage = false
    @Input() loading: boolean
    @Input() hasError: boolean

    constructor() {}

    ngOnInit() {}

    ngOnDestroy() {}
}
