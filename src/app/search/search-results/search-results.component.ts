import { Component, OnInit } from '@angular/core'
import { Filter } from 'src/app/list-view/list-view.interface'
import { FILTER_TYPE } from 'src/app/list-view/list-view.metadata'

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
    characterFilter: Filter = {
        type: FILTER_TYPE.title,
        value: 'spi',
    }

    constructor() {}

    ngOnInit() {}
}
