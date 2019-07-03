import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { AppState } from '../../store/app.reducer'
import { Filter as CharactersFilter } from 'src/app/characters/characters.component'
import { FILTER_TYPE as CharactersFilterType } from 'src/app/characters/character.model'

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
