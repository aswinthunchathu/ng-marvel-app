import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'
import { ActivatedRoute, Params } from '@angular/router'

import { Comic, Image } from 'src/app/shared/model/shared.interface'
import { AppState } from 'src/app/store/app.reducer'
import * as fromComicActions from './store/comic.actions'
import { ImageGenerator, types } from 'src/app/shared/model/image-generator.model'

@Component({
    selector: 'app-comic-details',
    templateUrl: './comic-details.component.html',
    styleUrls: ['./comic-details.component.scss'],
})
export class ComicDetailsComponent implements OnInit, OnDestroy {
    private routeSub: Subscription
    private comicSub: Subscription
    loading: boolean = true
    comic: Comic = null

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params: Params) => {
            this.store.dispatch(new fromComicActions.FetchComicStart(+params['id']))
        })

        this.comicSub = this.store.select('comic').subscribe(res => {
            this.loading = res.fetching
            if (res.data) {
                this.comic = res.data
            }
        })
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe()
        this.comicSub.unsubscribe()
    }
}
