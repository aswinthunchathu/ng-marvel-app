import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { CharactersService } from './characters.service'
import { Character } from '../shared/shared.interface'

@Component({
    selector: 'app-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit, OnDestroy {
    private charactersSub: Subscription
    characters: Character[] = []

    constructor(private characterServices: CharactersService) {}

    ngOnInit() {
        this.charactersSub = this.characterServices
            .fetchCharactersFromServer()
            .subscribe(() => (this.characters = this.characterServices.characters))
    }

    ngOnDestroy() {
        this.charactersSub.unsubscribe()
    }
}
