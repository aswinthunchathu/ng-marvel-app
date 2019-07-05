import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Filter } from '../../list/list.metadata'

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
    characterFilter: Filter

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        // this.route.queryParams.subscribe((data: Params) => {
        //     const { key } = data
        //     this.characterFilter = {
        //         type: CharactersFilterType.byTitle,
        //         value: key,
        //     }
        // })
    }
}
