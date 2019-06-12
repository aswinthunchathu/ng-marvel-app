import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { Character } from '../shared/model/shared.interface'
import { AppState } from '../store/app.reducer'
import * as fromCharactersAction from './store/characters.actions'

@Component({
    selector: 'app-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit, OnDestroy {
    private charactersSub: Subscription
    characters: Character[] = []

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.store.dispatch(new fromCharactersAction.FetchCharactersStart())
        this.charactersSub = this.store.select('characters').subscribe(res => (this.characters = res.data))
    }

    onScroll() {
        this.store.dispatch(new fromCharactersAction.FetchCharactersStart(true))
    }

    ngOnDestroy() {
        this.charactersSub.unsubscribe()
    }
}
