import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { tap, map } from 'rxjs/operators'
import { ActivatedRoute, Params } from '@angular/router'

import { AppState } from '../../store/app.reducer'
import * as fromCharacterActions from './store/character.actions'
import { Character } from '../../shared/model/shared.interface'
import { BgService } from 'src/app/shared/services/bg.service'
import { ImageGenerator } from 'src/app/shared/model/image-generator.model'

@Component({
    selector: 'app-character-details',
    templateUrl: './character-details.component.html',
    styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {
    private routeSub: Subscription
    private characterSub: Subscription
    loading: boolean = true
    character: Character = null
    bgImage: string = null

    constructor(private store: Store<AppState>, private route: ActivatedRoute, private bgService: BgService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params: Params) => {
            this.store.dispatch(new fromCharacterActions.FetchCharacterStart(+params['id']))
        })

        this.characterSub = this.store.select('character').subscribe(res => {
            this.loading = res.fetching
            if (res.data) {
                this.character = res.data
                this.bgService.setBgImage(
                    new ImageGenerator(res.data.thumbnail.path, res.data.thumbnail.extension).image
                )
            }
        })
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe()
        this.characterSub.unsubscribe()
        this.bgService.setBgImage('')
    }
}
